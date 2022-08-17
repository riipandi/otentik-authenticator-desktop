import { useRef, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { toast } from 'react-hot-toast'

import { useStores } from '../stores/stores'
import { sbClient } from '../utils/supabase'
import { DialogTransition } from './DialogTransition'
import { classNames } from '../utils/helpers'
import { useAuth } from '../hooks/useAuth'

export const FormCreate = () => {
    const session = useAuth()
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState<any>({ error: null, text: null })

    const formCreateOpen = useStores((state) => state.formCreateOpen)
    const setFormCreateOpen = useStores((state) => state.setFormCreateOpen)
    const cancelButtonRef = useRef(null)

    const [issuer, setIssuer] = useState('')
    const [userIdentity, setUserIdentity] = useState('')
    const [secretKey, setSecretKey] = useState('')
    const [backupCode, setBackupCode] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const { data, error } = await sbClient.from('vaults').insert([
            {
                user_id: session?.user?.id,
                issuer: issuer,
                user_identity: userIdentity,
                secret_key: secretKey,
                algorithm: 'SHA1',
                token_type: 'TOTP',
                period: 30,
                digits: 6,
            },
        ])

        if (error) {
            setLoading(false)
            setErrorMsg({ error: true, text: error.message })
            return toast.error(error.message)
        } else if (data) {
            setLoading(false)
            setErrorMsg({ error: true, text: 'Item already exists!' })
            return toast.error('Item already exists!')
        }

        setLoading(false)
        toast.success('Item saved!')
        setFormCreateOpen(false)
    }

    return (
        <DialogTransition
            isOpen={formCreateOpen}
            className='mt-2 flex h-full items-start justify-center px-4'
        >
            <Dialog.Panel className='relative w-full rounded-lg bg-white px-5 pt-5 pb-6 text-left shadow-lg'>
                <form onSubmit={handleSubmit}>
                    <div className='space-y-3'>
                        <div>
                            <label htmlFor='issuer' className='px-0.5 text-sm font-medium text-gray-600'>
                                Service name / issuer
                            </label>
                            <div className='mt-1'>
                                <input
                                    id='issuer'
                                    name='issuer'
                                    type='text'
                                    className='w-full rounded-md border border-gray-200 p-2 text-sm  placeholder-gray-400 hover:shadow focus:border-gray-500 focus:outline-none'
                                    onChange={(e) => setIssuer(e.target.value)}
                                    placeholder='Google'
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor='user-identity'
                                className='px-0.5 text-sm font-medium text-gray-600'
                            >
                                Username / email address
                            </label>
                            <div className='mt-1'>
                                <input
                                    id='user-identity'
                                    name='user_identity'
                                    type='text'
                                    className='w-full rounded-md border border-gray-200 p-2 text-sm placeholder-gray-400 hover:shadow focus:border-gray-500 focus:outline-none'
                                    onChange={(e) => setUserIdentity(e.target.value)}
                                    placeholder={session?.user?.email}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='secretkey' className='px-0.5 text-sm font-medium text-gray-600'>
                                Secret key
                            </label>
                            <div className='mt-1'>
                                <input
                                    id='secretkey'
                                    name='secretkey'
                                    type='text'
                                    className='w-full rounded-md border border-gray-200 p-2 text-sm  placeholder-gray-400 hover:shadow focus:border-gray-500 focus:outline-none'
                                    onChange={(e) => setSecretKey(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='backup-code' className='px-0.5 text-sm font-medium text-gray-600'>
                                Backup code (optional)
                            </label>
                            <div className='mt-1'>
                                <textarea
                                    rows={2}
                                    id='backup-code'
                                    name='backup_code'
                                    className='block w-full rounded-md border-gray-300 placeholder-gray-400 shadow-sm  focus:border-primary-500 focus:ring-primary-500 sm:text-sm'
                                    onChange={(e) => setBackupCode(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='mt-6 grid grid-cols-2 gap-4'>
                        <button
                            type='button'
                            className={classNames(
                                loading ? 'bg-gray-100 text-gray-400 ' : 'bg-white text-gray-700',
                                'inline-flex w-full justify-center rounded-md border border-gray-300 px-4 py-1.5 text-base font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm'
                            )}
                            onClick={() => setFormCreateOpen(false)}
                            ref={cancelButtonRef}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className={classNames(
                                loading
                                    ? 'border-gray-300 bg-gray-100 text-gray-400'
                                    : 'bg-primary-600 text-white',
                                'inline-flex w-full justify-center rounded-md border border-transparent px-4 py-1.5 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm'
                            )}
                            disabled={loading}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </Dialog.Panel>
        </DialogTransition>
    )
}

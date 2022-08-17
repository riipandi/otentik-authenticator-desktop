import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { EyeIcon, EyeOffIcon, LockClosedIcon, ShieldCheckIcon } from '@heroicons/react/outline'
import { ExclamationCircleIcon } from '@heroicons/react/solid'

import { useAuth } from '../hooks/useAuth'
import { sbClient } from '../utils/supabase'
import { classNames, createHash } from '../utils/helpers'
import { LoaderScreen } from './LoaderScreen'
import { DialogTransition } from './DialogTransition'

export const OnboardScreen = ({ open }: { open: boolean }) => {
    const session = useAuth()
    const [error, setError] = useState<any>({ error: null, text: null })
    const [passphrase, setPassphrase] = useState('')
    const [inputType, setInputType] = useState('password')
    const [loading, setLoading] = useState(false)

    const handleShowHidePassword = () => {
        setInputType(inputType === 'password' ? 'text' : 'password')
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (passphrase.length <= 1) {
            return setError({ error: true, text: 'Master key is required!' })
        }

        setLoading(true)

        const hash = await createHash(passphrase)
        const { error } = await sbClient
            .from('masterkeys')
            .insert({
                user_id: session?.user?.id,
                passphrase: hash,
                hints: null,
            })
            .single()

        if (error) {
            setLoading(false)
            return setError({ error: true, text: error.message })
        }

        await sbClient
            .from('users_profiles')
            .update({ onboarded_at: new Date().toISOString() })
            .match({ id: session?.user?.id })

        setLoading(false)
        setError(null)
    }

    if (loading) return <LoaderScreen />

    return (
        <DialogTransition isOpen={open} className='flex h-full items-center justify-center px-4'>
            <Dialog.Panel className='relative w-full rounded-lg bg-white px-4 py-6 text-left shadow-lg'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100'>
                            <ShieldCheckIcon className='h-6 w-6 text-blue-600' aria-hidden='true' />
                        </div>
                        <div className='mt-3 text-center sm:mt-5'>
                            <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                                Setup Master Key
                            </Dialog.Title>
                            <div className='mt-4'>
                                <p className='text-sm text-gray-500'>
                                    Enter a master key to unlock the vault.
                                    <br /> This key is used for access your vault. <br />
                                    Key must be different from your password.
                                </p>
                            </div>

                            <div className='mt-4'>
                                <label htmlFor='passphrase' className='sr-only'>
                                    Passphrase
                                </label>
                                <div className='relative mt-1 rounded-md shadow-sm'>
                                    <input
                                        type={inputType}
                                        name='passphrase'
                                        id='passphrase'
                                        className={classNames(
                                            error &&
                                                'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 ',
                                            'block w-full rounded-md pr-10 focus:outline-none sm:text-sm'
                                        )}
                                        onChange={(e) => {
                                            setError(null)
                                            setPassphrase(e.target.value)
                                        }}
                                        aria-invalid='true'
                                    />

                                    {error ? (
                                        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                                            <ExclamationCircleIcon
                                                className='h-5 w-5 text-red-500'
                                                aria-hidden='true'
                                            />
                                        </div>
                                    ) : (
                                        <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                                            {inputType === 'password' ? (
                                                <EyeOffIcon
                                                    className='h-5 w-5 text-gray-400'
                                                    onClick={handleShowHidePassword}
                                                    aria-hidden='true'
                                                />
                                            ) : (
                                                <EyeIcon
                                                    className='h-5 w-5 text-gray-400'
                                                    onClick={handleShowHidePassword}
                                                    aria-hidden='true'
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                                {error && <p className='mt-2 text-sm text-red-600'>{error.text}</p>}
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <button
                            type='submit'
                            className='inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:text-sm'
                        >
                            Save and Unlock
                        </button>
                    </div>
                </form>
            </Dialog.Panel>
        </DialogTransition>
    )
}

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { EyeIcon, EyeOffIcon, LockClosedIcon } from '@heroicons/react/outline'
import { ExclamationCircleIcon } from '@heroicons/react/solid'

import { useAuth } from '../hooks/useAuth'
import { sbClient } from '../utils/supabase'
import { classNames } from '../utils/helpers'
import { useStore } from '../stores/screenLockStore'
import { LoaderScreen } from './LoaderScreen'

export const LockScreen = () => {
    const session = useAuth()
    const locked = useStore((state) => state.locked)
    const setLockStreenState = useStore((state) => state.setLockStreenState)

    const [error, setError] = useState<any>({ error: null, text: null })
    const [passphrase, setPassphrase] = useState('')
    const [inputType, setInputType] = useState('password')
    const [loading, setLoading] = useState(false)

    const handleShowHidePassword = () => {
        setInputType(inputType === 'password' ? 'text' : 'password')
    }

    const handleUnlockAction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!passphrase) {
            return setError({ error: true, text: 'Passphrase required!' })
        }

        setLoading(true)
        const credentials = { email: session?.user?.email, password: passphrase }
        const { error } = await sbClient.auth.signIn(credentials)

        if (error) {
            setLoading(false)
            return setError({ error: true, text: error.message })
        }

        setLoading(false)
        setError(null)
        setLockStreenState(false)
    }

    if (loading) return <LoaderScreen />

    return (
        <Transition.Root show={locked} as={Fragment}>
            <Dialog as='div' className='relative z-20' static onClose={() => null}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 mt-12 bg-black/80 backdrop-blur-sm transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 z-20 overflow-hidden'>
                    <div className='flex min-h-full items-center justify-center p-6 text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
                                <form onSubmit={handleUnlockAction}>
                                    <div>
                                        <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100'>
                                            <LockClosedIcon
                                                className='h-6 w-6 text-red-600'
                                                aria-hidden='true'
                                            />
                                        </div>
                                        <div className='mt-3 text-center sm:mt-5'>
                                            <Dialog.Title
                                                as='h3'
                                                className='text-lg font-medium leading-6 text-gray-900'
                                            >
                                                Vault locked
                                            </Dialog.Title>
                                            <div className='mt-2'>
                                                <p className='text-sm text-gray-500'>
                                                    Enter your password to unlock the vault.
                                                </p>
                                            </div>

                                            <div className='mt-2'>
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
                                                {error && (
                                                    <p className='mt-2 text-sm text-red-600'>{error.text}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-5'>
                                        <button
                                            type='submit'
                                            className='inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:text-sm'
                                        >
                                            Unlock vault
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

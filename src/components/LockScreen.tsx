import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { EyeIcon, EyeOffIcon, LockClosedIcon } from '@heroicons/react/outline'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { classNames } from '../utils/helpers'
import { useStore } from '../stores/screenLockStore'

export const LockScreen = () => {
    const locked = useStore((state) => state.locked)
    const setLockStreenState = useStore((state) => state.setLockStreenState)

    const [error, setError] = useState(false)
    const [passphrase, setPassphrase] = useState('')
    const [inputType, setInputType] = useState('password')

    const handleShowHidePassword = () => {
        setInputType(inputType === 'password' ? 'text' : 'password')
    }

    const handleUnlockAction = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!passphrase || passphrase !== 'secret') {
            setError(true)
        } else {
            setError(false)
            setLockStreenState(false)
        }
    }

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
                    <div className='fixed inset-0 backdrop-blur-sm bg-black/80 transition-opacity mt-12' />
                </Transition.Child>

                <div className='fixed z-20 inset-0 overflow-hidden'>
                    <div className='flex items-center justify-center min-h-full p-6 text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <Dialog.Panel className='relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6'>
                                <form onSubmit={handleUnlockAction}>
                                    <div>
                                        <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100'>
                                            <LockClosedIcon
                                                className='h-6 w-6 text-red-600'
                                                aria-hidden='true'
                                            />
                                        </div>
                                        <div className='mt-3 text-center sm:mt-5'>
                                            <Dialog.Title
                                                as='h3'
                                                className='text-lg leading-6 font-medium text-gray-900'
                                            >
                                                Vault locked
                                            </Dialog.Title>
                                            <div className='mt-2'>
                                                <p className='text-sm text-gray-500'>
                                                    Enter your passphrase to unlock the vault.
                                                </p>
                                            </div>

                                            <div className='mt-2'>
                                                <label htmlFor='passphrase' className='sr-only'>
                                                    Passphrase
                                                </label>
                                                <div className='mt-1 relative rounded-md shadow-sm'>
                                                    <input
                                                        type={inputType}
                                                        name='passphrase'
                                                        id='passphrase'
                                                        className={classNames(
                                                            error &&
                                                                'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500 ',
                                                            'block w-full pr-10 focus:outline-none sm:text-sm rounded-md'
                                                        )}
                                                        onChange={(e) => {
                                                            setError(false)
                                                            setPassphrase(e.target.value)
                                                        }}
                                                        aria-describedby='passphrase-error'
                                                        aria-invalid='true'
                                                    />

                                                    {error ? (
                                                        <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                                                            <ExclamationCircleIcon
                                                                className='h-5 w-5 text-red-500'
                                                                aria-hidden='true'
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
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
                                                    <p
                                                        id='passphrase-error'
                                                        className='mt-2 text-sm text-red-600'
                                                    >
                                                        Invalid passphrase!
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-5'>
                                        <button
                                            type='submit'
                                            className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:text-sm'
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

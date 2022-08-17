import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { LockClosedIcon, CogIcon, LogoutIcon, DocumentAddIcon, XCircleIcon } from '@heroicons/react/outline'
import { MenuIcon } from '@heroicons/react/solid'
import { appWindow } from '@tauri-apps/api/window'
import { useHotkeys } from 'react-hotkeys-hook'
import { toast } from 'react-hot-toast'

import { useStores } from '../stores/stores'
import { classNames } from '../utils/helpers'
import { sbClient } from '../utils/supabase'
import { MenuDivider } from './MenuDivider'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const AppMenu = () => {
    const locked = useStores((state) => state.locked)
    const setLockStreenState = useStores((state) => state.setLockStreenState)
    const setFormCreateOpen = useStores((state) => state.setFormCreateOpen)
    const setLoading = useStores((state) => state.setLoading)

    // Reset all states before quit.
    const handleQuit = async () => {
        setLoading(false)
        setLockStreenState(true)
        // wait for screen locked before quitting
        await delay(1000)
        appWindow.close()
    }

    const handleSignOut = () => {
        sbClient.auth.signOut().catch(console.error)
    }

    // Keyboard shortcut for lock screen
    useHotkeys('ctrl+l, command+l', () => setLockStreenState(true))

    return (
        <div className='absolute top-0 right-0 z-40 flex h-14 items-center px-4'>
            <Menu as='div' className='relative'>
                <div>
                    <Menu.Button className='-mr-1 flex cursor-pointer items-center justify-center rounded-md p-1.5 outline-none hover:bg-gray-700'>
                        <MenuIcon className='h-6 w-6 text-white' />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                >
                    <Menu.Items className='absolute right-1 mt-2 w-48 origin-top-right rounded bg-white shadow ring-1 ring-black/5 focus:outline-none dark:bg-gray-700'>
                        {!locked && (
                            <>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type='button'
                                            className={classNames(
                                                active ? 'bg-gray-100 dark:bg-gray-500' : '',
                                                'inline-flex w-full items-center justify-between rounded-t px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-100'
                                            )}
                                            onClick={() => setFormCreateOpen(true)}
                                        >
                                            <span>Add new item</span>
                                            <DocumentAddIcon className='h-4 w-4 text-gray-500 dark:text-gray-300' />
                                        </button>
                                    )}
                                </Menu.Item>
                                <MenuDivider />
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type='button'
                                            className={classNames(
                                                active ? 'bg-gray-100 dark:bg-gray-500' : '',
                                                'inline-flex w-full items-center justify-between px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-100'
                                            )}
                                            onClick={() => toast.error('Not yet implemented!')}
                                        >
                                            <span>Preferences</span>
                                            <CogIcon className='h-4 w-4 text-gray-500 dark:text-gray-300' />
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type='button'
                                            className={classNames(
                                                active ? 'bg-gray-100 dark:bg-gray-500' : '',
                                                'inline-flex w-full items-center justify-between px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-100'
                                            )}
                                            onClick={() => setLockStreenState(true)}
                                        >
                                            <span>Lock Vault</span>
                                            <LockClosedIcon className='h-4 w-4 text-gray-500 dark:text-gray-300' />
                                        </button>
                                    )}
                                </Menu.Item>
                                <MenuDivider />
                            </>
                        )}
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    type='button'
                                    className={classNames(
                                        active ? 'bg-gray-100 dark:bg-gray-500' : '',
                                        'inline-flex w-full items-center justify-between rounded-b px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-100'
                                    )}
                                    onClick={handleSignOut}
                                >
                                    <span>Sign out</span>
                                    <LogoutIcon className='h-4 w-4 text-gray-500 dark:text-gray-300' />
                                </button>
                            )}
                        </Menu.Item>
                        <MenuDivider />
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    type='button'
                                    className={classNames(
                                        active ? 'bg-gray-100 dark:bg-gray-500' : '',
                                        'inline-flex w-full items-center justify-between rounded-b px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-100'
                                    )}
                                    onClick={handleQuit}
                                >
                                    <span>Quit</span>
                                    <XCircleIcon className='h-4 w-4 text-gray-500 dark:text-gray-300' />
                                </button>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

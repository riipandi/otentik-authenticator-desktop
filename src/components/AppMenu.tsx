import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { LockClosedIcon, CogIcon, LogoutIcon, DocumentAddIcon, XCircleIcon } from '@heroicons/react/outline'
import { MenuIcon } from '@heroicons/react/solid'
import { appWindow } from '@tauri-apps/api/window'

import { classNames } from '../utils/helpers'
import { sbClient } from '../utils/supabase'
import { useStore } from '../stores/screenLockStore'
import { MenuDivider } from './MenuDivider'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const AppMenu = () => {
    const locked = useStore((state) => state.locked)
    const setLockStreenState = useStore((state) => state.setLockStreenState)

    const handleQuit = async () => {
        setLockStreenState(true)
        // wait for screen locked before quitting
        await delay(1000)
        appWindow.close()
    }

    const handleSignOut = () => {
        sbClient.auth.signOut().catch(console.error)
    }

    return (
        <div className='absolute top-0 right-0 z-40 h-14 flex items-center px-4'>
            <Menu as='div' className='relative'>
                <div>
                    <Menu.Button className='hover:bg-gray-700 p-1.5 items-center justify-center flex -mr-1 rounded-md cursor-pointer outline-none'>
                        <MenuIcon className='w-6 h-6 text-white' />
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
                    <Menu.Items className='origin-top-right absolute right-1 mt-2 w-48 rounded shadow bg-white dark:bg-gray-700 ring-1 ring-black/5 focus:outline-none'>
                        {!locked && (
                            <>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type='button'
                                            className={classNames(
                                                active ? 'bg-gray-100 dark:bg-gray-500' : '',
                                                'px-5 py-2.5 text-sm text-gray-700 dark:text-gray-100 font-medium rounded-t inline-flex items-center w-full justify-between'
                                            )}
                                        >
                                            <span>Add new item</span>
                                            <DocumentAddIcon className='w-4 h-4 text-gray-500 dark:text-gray-300' />
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
                                                'inline-flex items-center w-full px-5 py-2.5 text-sm text-gray-700 dark:text-gray-100 font-medium justify-between'
                                            )}
                                        >
                                            <span>Preferences</span>
                                            <CogIcon className='w-4 h-4 text-gray-500 dark:text-gray-300' />
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type='button'
                                            className={classNames(
                                                active ? 'bg-gray-100 dark:bg-gray-500' : '',
                                                'inline-flex items-center w-full px-5 py-2.5 text-sm text-gray-700 dark:text-gray-100 font-medium justify-between'
                                            )}
                                            onClick={() => setLockStreenState(true)}
                                        >
                                            <span>Lock Vault</span>
                                            <LockClosedIcon className='w-4 h-4 text-gray-500 dark:text-gray-300' />
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
                                        'inline-flex items-center w-full px-5 py-2.5 text-sm text-gray-700 dark:text-gray-100 font-medium rounded-b justify-between'
                                    )}
                                    onClick={handleSignOut}
                                >
                                    <span>Sign out</span>
                                    <LogoutIcon className='w-4 h-4 text-gray-500 dark:text-gray-300' />
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
                                        'inline-flex items-center w-full px-5 py-2.5 text-sm text-gray-700 dark:text-gray-100 font-medium rounded-b justify-between'
                                    )}
                                    onClick={handleQuit}
                                >
                                    <span>Quit</span>
                                    <XCircleIcon className='w-4 h-4 text-gray-500 dark:text-gray-300' />
                                </button>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

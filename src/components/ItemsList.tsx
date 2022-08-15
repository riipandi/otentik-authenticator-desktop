import { PencilAltIcon } from '@heroicons/react/outline'
import { toast } from 'react-hot-toast'
import clipboard from 'clipboardy'

import { vault } from '../mocks'

export const ItemsList = () => {
    return (
        <>
            {Object.keys(vault).map((letter) => (
                <div key={letter} className='relative'>
                    <div className='sticky top-0 border-t border-b border-gray-200 bg-gray-100 px-6 py-1 text-sm font-medium text-gray-500 dark:border-gray-700 dark:bg-gray-800'>
                        <h3>{letter}</h3>
                    </div>
                    <ul role='list' className='relative z-0 divide-y divide-gray-200 dark:divide-gray-700'>
                        {/* @ts-ignore */}
                        {vault[letter].map((item) => (
                            <li key={item.id} className='bg-gray-50 dark:bg-gray-900'>
                                <div className='group relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 hover:bg-primary-50 dark:hover:bg-gray-800'>
                                    <button
                                        type='button'
                                        className='relative flex-shrink-0 rounded-lg'
                                        onClick={() => {
                                            clipboard.write(item.token)
                                            toast.success('Token copied to clipboard!')
                                        }}
                                    >
                                        <div className='absolute z-20 h-10 w-20 cursor-pointer rounded-lg bg-white/30 backdrop-blur-sm transition delay-150 duration-150 ease-in-out group-hover:bg-transparent group-hover:backdrop-blur-none' />
                                        <div className='inline-flex h-10 w-20 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 transition delay-150 duration-300 ease-in-out group-hover:-translate-y-1 group-hover:scale-110'>
                                            <span className='font-mono text-sm font-bold leading-none tracking-tighter text-white'>
                                                {item.token}
                                            </span>
                                        </div>
                                    </button>
                                    <div className='flex w-full min-w-0 flex-1 justify-between'>
                                        <div className='focus:outline-none'>
                                            <span className='absolute inset-0' aria-hidden='true' />
                                            <p className='text-xs font-bold text-gray-900 dark:text-gray-200'>
                                                {item.issuer.toUpperCase()}
                                            </p>
                                            <p className='truncate text-xs font-medium text-gray-500 dark:text-gray-400'>
                                                {item.userId}
                                            </p>
                                        </div>

                                        <div className='r-0 relative z-10 -mr-0.5 flex items-center justify-end'>
                                            <PencilAltIcon className='h-5 w-5 cursor-pointer text-gray-500 hover:text-orange-600 dark:text-gray-300' />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    )
}

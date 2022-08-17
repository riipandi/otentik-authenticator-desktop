import { useRef } from 'react'
import { Dialog } from '@headlessui/react'

import { useStores } from '../stores/stores'
import { DialogTransition } from './DialogTransition'

export const FormCreate = () => {
    const formCreateOpen = useStores((state) => state.formCreateOpen)
    const setFormCreateOpen = useStores((state) => state.setFormCreateOpen)
    const cancelButtonRef = useRef(null)

    return (
        <DialogTransition
            isOpen={formCreateOpen}
            className='mt-2 flex h-full items-start justify-center px-4'
        >
            <Dialog.Panel className='relative w-full rounded-lg bg-white px-5 pt-5 pb-6 text-left shadow-lg'>
                <form>
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
                                    className='w-full rounded-md border border-gray-200 p-2 text-sm hover:shadow focus:border-gray-500 focus:outline-none'
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='userid' className='px-0.5 text-sm font-medium text-gray-600'>
                                Username / email address
                            </label>
                            <div className='mt-1'>
                                <input
                                    id='userid'
                                    name='userid'
                                    type='text'
                                    className='w-full rounded-md border border-gray-200 p-2 text-sm hover:shadow focus:border-gray-500 focus:outline-none'
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
                                    className='w-full rounded-md border border-gray-200 p-2 text-sm hover:shadow focus:border-gray-500 focus:outline-none'
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
                                    className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                                    defaultValue={''}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='mt-6 grid grid-cols-2 gap-4'>
                        <button
                            type='button'
                            className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-1.5 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm'
                            onClick={() => setFormCreateOpen(false)}
                            ref={cancelButtonRef}
                        >
                            Cancel
                        </button>
                        <button
                            type='button'
                            className='inline-flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-1.5 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm'
                            onClick={() => setFormCreateOpen(false)}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </Dialog.Panel>
        </DialogTransition>
    )
}

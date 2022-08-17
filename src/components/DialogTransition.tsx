import { FC, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

type FormCreateProps = {
    children: React.ReactNode
    className?: string
    isOpen: boolean
}

export const DialogTransition: FC<FormCreateProps> = ({ children, isOpen, className }) => {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-20' onClose={() => null}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 z-10 -mx-1 h-full min-h-screen overflow-auto overscroll-auto pt-16 scrollbar-hide'>
                    <div className={className}>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 trangray-y-4 sm:trangray-y-0 sm:scale-95'
                            enterTo='opacity-100 trangray-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 trangray-y-0 sm:scale-100'
                            leaveTo='opacity-0 trangray-y-4 sm:trangray-y-0 sm:scale-95'
                        >
                            {children}
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

import { MenuIcon } from '@heroicons/react/outline'

export const MenuButton = () => {
    return (
        <div className='absolute top-0 right-0 z-50 h-14 flex items-center px-4'>
            <div className='hover:bg-gray-700 p-1.5 items-center justify-center flex -mr-1 rounded-md cursor-pointer'>
                <MenuIcon className='w-6 h-6 text-white' />
            </div>
        </div>
    )
}

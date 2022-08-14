import { SearchIcon } from '@heroicons/react/outline'

export const SearchBar = () => {
    return (
        <div className='-mt-1 bg-gray-900 pb-5 px-4 flex justify-between fixed left-0 right-0 z-40 max-w-sm mx-auto'>
            <div className='relative w-full'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <SearchIcon className='h-5 w-5 text-gray-400' />
                </div>
                <input
                    id='search'
                    name='search'
                    className='block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-700 focus:border-gray-700 focus:ring-gray-700 focus:text-gray-100 sm:text-sm'
                    placeholder='Search'
                    type='search'
                />
            </div>
        </div>
    )
}

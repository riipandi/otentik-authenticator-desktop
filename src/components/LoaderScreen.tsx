export const LoaderScreen = () => {
    return (
        <div className='fixed inset-0 z-20 bg-gray-900 backdrop-blur-sm transition-opacity'>
            <div className='flex h-full w-full max-w-sm items-center justify-center'>
                <div className='loader opacity-50'>Loading...</div>
            </div>
        </div>
    )
}

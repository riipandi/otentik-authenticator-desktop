export const LoaderScreen = () => {
    return (
        <div className='fixed inset-0 backdrop-blur-sm bg-gray-900 transition-opacity z-20'>
            <div className='max-w-sm w-full h-full flex items-center justify-center'>
                <div className='loader opacity-50'>Loading...</div>
            </div>
        </div>
    )
}

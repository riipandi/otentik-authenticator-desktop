import { useState } from 'react'

function App() {
    const [count, setCount] = useState(0)

    const handleClick = () => {
        setCount((count) => count + 1)
    }

    return (
        <div className='b'>
            <h1>Otentik Authenticator</h1>
            <button
                type='button'
                className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                onClick={handleClick}
            >
                count is {count}
            </button>
        </div>
    )
}

export default App

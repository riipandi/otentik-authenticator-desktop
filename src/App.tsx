import { appWindow } from '@tauri-apps/api/window'

import { useAuth } from './hooks/useAuth'
import { AppMenu } from './components/AppMenu'
import { ItemsList } from './components/ItemsList'
import { LockScreen } from './components/LockScreen'
import { LoginScreen } from './components/LoginScreen'
import { SearchBar } from './components/SearchBar'
import { XCircleIcon } from '@heroicons/react/outline'

const AuthScreen = () => (
    <>
        <div className='absolute top-0 right-0 z-40 h-14 flex items-center px-4'>
            <div className='relative'>
                <div>
                    <button
                        className='hover:bg-gray-700 p-1.5 items-center justify-center flex -mr-1 rounded-md cursor-pointer outline-none'
                        onClick={() => appWindow.close()}
                    >
                        <XCircleIcon className='w-6 h-6 text-white' />
                    </button>
                </div>
            </div>
        </div>
        <LoginScreen />
    </>
)

const MainScreen = () => (
    <>
        <AppMenu />
        <LockScreen />
        <SearchBar />
        <div className='pt-14 overscroll-auto overflow-y-auto relative p-0 h-[514px] scrollbar-hide bg-gray-50 dark:bg-gray-900 z-0'>
            <ItemsList />
        </div>
    </>
)

function App() {
    const session = useAuth()
    return <div className='pt-16'>{!session ? <AuthScreen /> : <MainScreen />}</div>
}

export default App

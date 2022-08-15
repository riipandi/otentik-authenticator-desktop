import { appWindow } from '@tauri-apps/api/window'

import { useAuth } from './hooks/useAuth'
import { AppMenu } from './components/AppMenu'
import { ItemsList } from './components/ItemsList'
import { LockScreen } from './components/LockScreen'
import { LoginScreen } from './components/LoginScreen'
import { SearchBar } from './components/SearchBar'
import { XCircleIcon } from '@heroicons/react/outline'
// import { EmptyState } from './components/EmptyState'

const AuthScreen = () => (
    <>
        <div className='absolute top-0 right-0 z-40 flex h-14 items-center px-4'>
            <div className='relative'>
                <div>
                    <button
                        className='-mr-1 flex cursor-pointer items-center justify-center rounded-md p-1.5 outline-none hover:bg-gray-700'
                        onClick={() => appWindow.close()}
                    >
                        <XCircleIcon className='h-6 w-6 text-white' />
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
        <div className='relative z-0 -mx-1 h-[520px] overflow-y-auto overscroll-auto bg-gray-50 p-0 pt-14 scrollbar-hide dark:bg-gray-900'>
            {/* <EmptyState /> */}
            <ItemsList />
        </div>
    </>
)

function App() {
    const session = useAuth()
    return <div className='pt-16'>{!session ? <AuthScreen /> : <MainScreen />}</div>
}

export default App

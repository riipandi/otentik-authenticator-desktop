import { useEffect } from 'react'
import { appWindow } from '@tauri-apps/api/window'
import { useHotkeys } from 'react-hotkeys-hook'

import { useAuth } from './hooks/useAuth'
import { AppMenu } from './components/AppMenu'
import { LockScreen } from './components/LockScreen'
import { LoginScreen } from './components/LoginScreen'
import { SearchBar } from './components/SearchBar'
import { XCircleIcon } from '@heroicons/react/outline'
import { disableBrowserEvents } from './utils/helpers'
import { ItemsList } from './components/ItemsList'
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
        <div className='relative -mx-1 h-[520px] overflow-y-auto overscroll-auto bg-gray-50 p-0 pt-14 scrollbar-hide dark:bg-gray-900'>
            {/* <EmptyState /> */}
            <ItemsList />
        </div>
    </>
)

function App() {
    const session = useAuth()

    // Keyboard shortcut for open debugging tools
    useHotkeys('cmd+alt+j', () => console.log('FUCK'))
    useHotkeys('ctrl+k, command+k', () => console.log('KEYBOARD SHORTCUT CHEATSHEETS'))

    useEffect(() => {
        // disableBrowserEvents('contextmenu')
        // disableBrowserEvents('selectstart')

        const fetchData = async () => {
            if (session) {
                await appWindow.emit('window-loaded', { loggedIn: true, token: session.access_token })
            }
        }

        fetchData().catch(console.error)
    }, [session])

    return <div className='pt-16'>{!session ? <AuthScreen /> : <MainScreen />}</div>
}

export default App

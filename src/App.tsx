import { useAuth } from './hooks/useAuth'

import { AppMenu } from './components/AppMenu'
import { ItemsList } from './components/ItemsList'
import { LockScreen } from './components/LockScreen'
import { LoginScreen } from './components/LoginScreen'
import { SearchBar } from './components/SearchBar'

function App() {
    const session = useAuth()

    return (
        <div className='pt-16'>
            {!session ? (
                <LoginScreen />
            ) : (
                <>
                    <LockScreen />
                    <AppMenu />
                    <SearchBar />
                    <div className='pt-14 overscroll-auto overflow-y-auto relative p-0 h-[514px] scrollbar-hide bg-gray-50 dark:bg-gray-900'>
                        <ItemsList />
                    </div>
                </>
            )}
        </div>
    )
}

export default App

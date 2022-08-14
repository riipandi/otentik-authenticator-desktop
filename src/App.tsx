import { SearchBar } from './components/SearchBar'
import { ItemsList } from './components/ItemsList'
import { AppMenu } from './components/AppMenu'
import { LockScreen } from './components/LockScreen'

function App() {
    return (
        <div className='pt-16'>
            <LockScreen />
            <AppMenu />
            <SearchBar />
            <div className='pt-14 overscroll-auto overflow-y-auto relative p-0 h-[514px] scrollbar-hide bg-gray-50 dark:bg-gray-900'>
                <ItemsList />
            </div>
        </div>
    )
}

export default App

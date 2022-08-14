import { SearchBar } from './components/SearchBar'
import { ItemsList } from './components/ItemsList'
import { MenuButton } from './components/MenuButton'

function App() {
    return (
        <div className='pt-16'>
            <MenuButton />
            <SearchBar />
            <div className='pt-14 overscroll-auto overflow-y-auto relative p-0 h-[514px] scrollbar-hide bg-gray-50 dark:bg-gray-900'>
                <ItemsList />
            </div>
        </div>
    )
}

export default App

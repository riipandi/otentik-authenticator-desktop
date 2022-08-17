import { AppMenu } from './AppMenu'
import { FormCreate } from './FormCreate'
import { ItemsList } from './ItemsList'
import { LockScreen } from './LockScreen'
import { ProgressBar } from './ProgressBar'
import { SearchBar } from './SearchBar'

export const MainScreen = () => {
    return (
        <>
            <AppMenu />
            <LockScreen />
            <SearchBar />
            <ProgressBar percentage={100} />
            <div className='relative -mx-1 h-[520px] overflow-y-auto overscroll-auto bg-gray-50 p-0 pt-14 scrollbar-hide dark:bg-gray-900'>
                <ItemsList />
            </div>
            <FormCreate />
        </>
    )
}

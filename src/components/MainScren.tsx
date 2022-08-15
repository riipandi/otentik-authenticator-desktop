import { useEffect, useState } from 'react'

import { AppMenu } from './AppMenu'
import { LockScreen } from './LockScreen'
import { SearchBar } from './SearchBar'
import { ItemsList } from './ItemsList'
import { ProgressBar } from './ProgressBar'
// import { EmptyState } from './EmptyState'

export const MainScreen = () => {
    // const [count, setCount] = useState(0)

    useEffect(() => {})

    return (
        <>
            <AppMenu />
            <LockScreen />
            <SearchBar />
            <ProgressBar percentage={100} />
            <div className='relative -mx-1 h-[520px] overflow-y-auto overscroll-auto bg-gray-50 p-0 pt-14 scrollbar-hide dark:bg-gray-900'>
                {/* <EmptyState /> */}
                <ItemsList />
            </div>
        </>
    )
}

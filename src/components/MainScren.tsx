import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useStores } from '../stores/stores'

import { parseVaults } from '../utils/helpers'
import { sbClient } from '../utils/supabase'

import { AppMenu } from './AppMenu'
import { FormCreate } from './FormCreate'
import { ItemsList } from './ItemsList'
import { LockScreen } from './LockScreen'
import { ProgressBar } from './ProgressBar'
import { SearchBar } from './SearchBar'

export const MainScreen = () => {
    const loading = useStores((state) => state.loading)
    const setLoading = useStores((state) => state.setLoading)

    const [count, setCount] = useState(0)
    const [startCount, setStartCount] = useState(false)
    const [vault, setVault] = useState([] as any)

    const fetchData = async () => {
        const { data, error } = await sbClient.from('vaults').select()
        if (error) return toast.error(error.message)
        setVault(await parseVaults(data))
    }

    useEffect(() => {
        // if (startCount) {
        const intervalId = setInterval(() => {
            fetchData()
        }, 30000) // in milliseconds
        // console.info(`Refreshing tokens in ${intervalId} second(s)`)
        // setCount(intervalId / 20000)
        return () => clearInterval(intervalId)
        // }
    }, [vault])

    return (
        <>
            <AppMenu />
            <LockScreen />
            <SearchBar />
            <ProgressBar percentage={100} />
            <div className='relative -mx-1 h-[520px] overflow-y-auto overscroll-auto bg-gray-50 p-0 pt-14 scrollbar-hide dark:bg-gray-900'>
                <ItemsList data={vault} loading={loading} />
            </div>
            <FormCreate />
        </>
    )
}

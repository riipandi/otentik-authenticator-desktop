import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import { parseVaults } from '../utils/helpers'
import { sbClient } from '../utils/supabase'

import { AppMenu } from './AppMenu'
import { FormCreate } from './FormCreate'
import { ItemsList } from './ItemsList'
import { LockScreen } from './LockScreen'
import { ProgressBar } from './ProgressBar'
import { SearchBar } from './SearchBar'

export const MainScreen = () => {
    const refreshTime = 30000 //How frequently you want to refresh the data, in ms
    const [loading, setLoading] = useState(false)
    const [vault, setVault] = useState([] as any)

    const fetchData = async () => {
        const { data, error } = await sbClient.from('vaults').select()
        if (error) return toast.error(error.message)
        setVault(await parseVaults(data))
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
        const interval = setInterval(() => {
            fetchData()
        }, refreshTime)

        return () => clearInterval(interval)
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

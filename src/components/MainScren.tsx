import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useStores } from '~/stores/stores'

import { parseCollections } from '../utils/array-helpers'
import { fetchVault } from '../utils/supabase'

import { AppMenu } from './AppMenu'
import { FormCreate } from './FormCreate'
import { ItemsList } from './ItemsList'
import { LockScreen } from './LockScreen'
import { ProgressBar } from './ProgressBar'
import { SearchBar } from './SearchBar'

export const MainScreen = () => {
  const refreshTime = 30000 // How frequently you want to refresh the data, in ms
  const [loading, setLoading] = useState(false)
  const [collection, setCollection] = useState([] as any)

  const forceFetch = useStores((state) => state.forceFetch)
  const setForceFetch = useStores((state) => state.setForceFetch)

  const fetchData = async () => {
    // TODO: add caching to improve performance.
    const { data, error } = await fetchVault()

    if (error) {
      setLoading(false)
      toast.error(error.message)
    }

    const collectionData = await parseCollections(data || [])
    setCollection(collectionData)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(() => {
      fetchData()
    }, refreshTime)

    return () => clearInterval(interval)
  }, [collection])

  if (forceFetch) {
    fetchData()
    setForceFetch(false)
  }

  return (
    <>
      <AppMenu />
      <LockScreen />
      <SearchBar />
      <ProgressBar percentage={100} />
      <div className='relative -mx-1 h-[520px] overflow-y-auto overscroll-auto bg-gray-50 p-0 pt-14 scrollbar-hide dark:bg-gray-900'>
        <ItemsList data={collection} loading={loading} />
      </div>
      <FormCreate />
    </>
  )
}

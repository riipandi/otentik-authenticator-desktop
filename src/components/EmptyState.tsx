import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { DocumentDuplicateIcon, RefreshIcon } from '@heroicons/react/outline'

import { classNames, parseVaults } from '../utils/helpers'
import { sbClient } from '../utils/supabase'
import { useStores } from '../stores/stores'

export const EmptyState = () => {
    const [setVault] = useState([] as any)
    const loading = useStores((state) => state.loading)
    const setLoading = useStores((state) => state.setLoading)
    const [lastSync, setLastSync] = useState(new Date())

    const fetchData = async () => {
        const { data, error } = await sbClient.from('vaults').select()
        if (error) return toast.error(error.message)

        setLastSync(new Date())
        setVault(await parseVaults(data))
        toast.success('Syncing complete')
    }

    return (
        <div className='relative -mt-6 flex h-full flex-col items-center justify-center text-center'>
            <div>
                <DocumentDuplicateIcon className='mx-auto h-12 w-12 text-gray-400' />
                <h3 className='my-6 text-sm font-medium text-gray-900'>
                    Last sync: {lastSync.toLocaleString()}
                </h3>
                <div className='mx-auto flex justify-center'>
                    <button
                        type='button'
                        className={classNames(
                            loading ? 'bg-gray-50' : 'bg-white hover:bg-gray-50',
                            'flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm'
                        )}
                        onClick={fetchData}
                        disabled={loading}
                    >
                        <RefreshIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
                        <span>{loading ? 'Refreshing data' : 'Sync data'}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

import { FC } from 'react'

import { EmptyState } from './EmptyState'
import { ItemSingle } from './ItemSingle'

interface ItemProps {
  data: any
  loading: boolean
}

export const ItemsList: FC<ItemProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className='flex h-full items-center justify-center bg-gray-900 font-medium'>
        <div className='loader'>Loading...</div>
      </div>
    )
  }

  if (!data || Object.keys(data).length === 0) {
    return <EmptyState />
  }

  return (
    <>
      {Object.keys(data).map((letter) => (
        <div key={letter} className='relative'>
          <div className='sticky top-0 border-t border-b border-gray-200 bg-gray-100 px-6 py-1 text-sm font-medium text-gray-500 dark:border-gray-700 dark:bg-gray-800'>
            <h3>{letter}</h3>
          </div>
          <ul className='relative z-0 divide-y divide-gray-200 dark:divide-gray-700'>
            {data[letter].map((item: any) => (
              <li key={item.id} className='bg-gray-50 dark:bg-gray-900'>
                <ItemSingle item={item} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}

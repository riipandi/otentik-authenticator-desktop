import { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import { sbClient } from './utils/supabase'

import { AppMenu } from './components/AppMenu'
import { ItemsList } from './components/ItemsList'
import { LockScreen } from './components/LockScreen'
import { LoginScreen } from './components/LoginScreen'
import { SearchBar } from './components/SearchBar'

interface UserProps {
    user: any
}

function App() {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        setSession(sbClient.auth.session())

        const { data: authListener } = sbClient.auth.onAuthStateChange(async (_event, session) => {
            setSession(session)
        })

        return () => {
            authListener?.unsubscribe()
        }
    }, [session])

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

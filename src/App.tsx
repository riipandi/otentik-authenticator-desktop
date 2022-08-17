import { useEffect, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import { disableBrowserEvents } from './utils/helpers'
import { useAuth } from './hooks/useAuth'

import { MainScreen } from './components/MainScren'
import { AuthScreen } from './components/AuthScreen'
import { useStores } from './stores/stores'
import { localData } from './utils/storage'
import { OnboardScreen } from './components/OnboardScreen'
import { sbClient } from './utils/supabase'

function App() {
    const session = useAuth()
    const setFormCreateOpen = useStores((state) => state.setFormCreateOpen)

    // Keyboard shortcut for open debugging tools
    // useHotkeys('cmd+alt+j', () => console.log('Open DevTools'))
    // useHotkeys('ctrl+k, command+k', () => console.log('KEYBOARD SHORTCUT CHEATSHEETS'))
    useHotkeys('ctrl+n, command+n', () => setFormCreateOpen(true))

    useEffect(() => {
        disableBrowserEvents('contextmenu')
        disableBrowserEvents('selectstart')

        // const { data: authListener } = sbClient.auth.onAuthStateChange(
        //     async (event, session) => {
        //         const currentUser = session?.user;
        //         setUser(currentUser ?? null);
        //     }
        // );

        const fetchData = async () => {
            if (session) await localData.set('session', session)
        }

        fetchData().catch(console.error)
    }, [session])

    return <div className='pt-16'>{!session ? <AuthScreen /> : <MainScreen />}</div>
}

export default App

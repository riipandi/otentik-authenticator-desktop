import { useEffect, useState } from 'react'
import { appWindow } from '@tauri-apps/api/window'
import { useHotkeys } from 'react-hotkeys-hook'
import { disableBrowserEvents } from './utils/helpers'
import { useAuth } from './hooks/useAuth'

import { MainScreen } from './components/MainScren'
import { AuthScreen } from './components/AuthScreen'

function App() {
    const session = useAuth()

    // Keyboard shortcut for open debugging tools
    useHotkeys('cmd+alt+j', () => console.log('Open DevTools'))
    useHotkeys('ctrl+k, command+k', () => console.log('KEYBOARD SHORTCUT CHEATSHEETS'))

    useEffect(() => {
        disableBrowserEvents('contextmenu')
        disableBrowserEvents('selectstart')

        const fetchData = async () => {
            if (session) {
                await appWindow.emit('window-loaded', { loggedIn: true, token: session.access_token })
            }
        }

        fetchData().catch(console.error)
    }, [session])

    return <div className='pt-16'>{!session ? <AuthScreen /> : <MainScreen />}</div>
}

export default App

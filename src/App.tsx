import { useEffect } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import { disableBrowserEvents } from './utils/ui-helpers'
import { useAuth } from './hooks/useAuth'

import { MainScreen } from './components/MainScren'
import { AuthScreen } from './components/AuthScreen'
import { useStores } from './stores/stores'

function App() {
  const session = useAuth()
  const setFormCreateOpen = useStores((state) => state.setFormCreateOpen)

  // Keyboard shortcut for open debugging tools
  // useHotkeys('cmd+alt+j', () => console.log('Open DevTools'))
  useHotkeys('ctrl+n, command+n', () => setFormCreateOpen(true))

  useEffect(() => {
    disableBrowserEvents('contextmenu')
    disableBrowserEvents('selectstart')
  })

  return (
    <div className='pt-16'>{!session ? <AuthScreen /> : <MainScreen />}</div>
  )
}

export default App

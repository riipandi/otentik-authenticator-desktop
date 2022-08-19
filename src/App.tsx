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
  const setForceFetch = useStores((state) => state.setForceFetch)

  // Register keyboard shortcuts
  useHotkeys('ctrl+r, command+r', () => setForceFetch(true))
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

import create from 'zustand'
import { persist } from 'zustand/middleware'

interface LockState {
    locked: boolean
    setLockStreenState: (status: boolean) => void
}

export const useStore = create<LockState>()(
    persist(
        (set) => ({
            locked: true,
            setLockStreenState: (status) => set((state) => ({ locked: (state.locked = status) })),
        }),
        {
            name: 'otentik-authenticator',
        }
    )
)

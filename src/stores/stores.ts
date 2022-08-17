import create from 'zustand'
import { persist } from 'zustand/middleware'

interface IStores {
    locked: boolean
    formCreateOpen: boolean
    setLockStreenState: (status: boolean) => void
    setFormCreateOpen: (status: boolean) => void
}

export const useStores = create<IStores>()(
    persist(
        (set) => ({
            locked: true,
            formCreateOpen: false,
            setLockStreenState: (status) => set((state) => ({ locked: (state.locked = status) })),
            setFormCreateOpen: (status) =>
                set((state) => ({
                    formCreateOpen: (state.formCreateOpen = status),
                })),
        }),
        {
            name: 'otentik-authenticator',
        }
    )
)

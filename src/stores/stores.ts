import create from 'zustand'
import { persist } from 'zustand/middleware'

interface IStores {
    locked: boolean
    remainingTime: number
    formCreateOpen: boolean
    setLockStreenState: (status: boolean) => void
    setFormCreateOpen: (status: boolean) => void
    setRemainingTime: (time: number) => void
}

export const useStores = create<IStores>()(
    persist(
        (set) => ({
            locked: true,
            formCreateOpen: false,
            remainingTime: 0,
            setLockStreenState: (status) => set((state) => ({ locked: (state.locked = status) })),
            setRemainingTime: (time) => set((state) => ({ remainingTime: (state.remainingTime = time) })),
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

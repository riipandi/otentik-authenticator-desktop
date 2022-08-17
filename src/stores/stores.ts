import create from 'zustand'
import { persist } from 'zustand/middleware'

interface IStores {
    locked: boolean
    loading: boolean
    remainingTime: number
    formCreateOpen: boolean
    setLoading: (status: boolean) => void
    setLockStreenState: (status: boolean) => void
    setFormCreateOpen: (status: boolean) => void
    setRemainingTime: (time: number) => void
}

export const useStores = create<IStores>()(
    persist(
        (set) => ({
            locked: true,
            loading: false,
            formCreateOpen: false,
            remainingTime: 0,
            setLoading: (status) => set((state) => ({ loading: (state.loading = status) })),
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

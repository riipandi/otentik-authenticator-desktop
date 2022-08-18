import { createClient } from '@supabase/supabase-js'

export const VITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
export const VITE_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const sbClient = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)

export const fetchCollections = async () => {
    return await sbClient.from('collections').select()
}

export const fetchPassphrase = async (userId: string, passphrase: string) => {
    return await sbClient.from('users_profiles').select('passphrase').match({
        id: userId,
        passphrase,
    })
}

import { invoke } from '@tauri-apps/api/tauri'

// Get initial from full name for avatar.
export const getInitials = (fullName: string): string => {
    const nameArr = fullName.split('')
    let initials = nameArr.filter(function (char) {
        return /[A-Z]/.test(char)
    })
    return initials.join('')
}

// Generate TOTP token from secret using Rust.
// https://tauri.app/v1/guides/features/command/
export const generateTOTP = async (secret: string): Promise<any> => {
    return invoke('generate_totp', { secret, period: 30, digits: 6 })
    // .then((token) =>  console.log(token))
    // .catch((error) => console.error(error))
}

// Split number to array of number.
export const splitNumber = (number: number): number[] => {
    return number.toString().split('').map(Number)
}

// Disable browser back button.
export const disableBrowserEvents = (eventName: string) => {
    return document.addEventListener(
        eventName,
        (e) => {
            e.preventDefault()
            return false
        },
        { capture: true }
    )
}

export function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

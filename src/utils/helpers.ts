import { invoke } from '@tauri-apps/api/tauri'
import { localData } from './storage'

// Get initial from full name for avatar.
export const getInitials = (fullName: string): string => {
    const nameArr = fullName.split('')
    let initials = nameArr.filter(function (char) {
        return /[A-Z]/.test(char)
    })
    return initials.join('')
}

type GenerateTOTPTypes = {
    secret: string
    digits: number
    period: number
    algorithm: 'SHA1' | 'SHA256'
}
// Generate TOTP token from secret using Rust.
// https://tauri.app/v1/guides/features/command/
export const generateTOTP = async ({
    secret,
    period,
    digits,
    algorithm,
}: GenerateTOTPTypes): Promise<any> => {
    return invoke('generate_totp', { secret, period, digits, algorithm })
}

export const encryptStr = async (plainStr: string): Promise<any> => {
    const passphrase = await localData.get('passphrase')
    return invoke('encrypt_str', { plainStr, passphrase })
}

export const decryptStr = async (encryptedStr: string): Promise<any> => {
    const passphrase = await localData.get('passphrase')
    return invoke('decrypt_str', { encryptedStr, passphrase })
}

export const createHash = async (plaintext: string): Promise<any> => {
    return invoke('create_hash', { plaintext })
}

export const verifyHash = async (plaintext: string, hashedStr: string): Promise<any> => {
    return invoke('verify_hash', { plaintext, hashedStr })
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

/**
 * Function to sort alphabetically an array of objects by some specific key.
 *
 * @param {String} prop Key of the object to sort.
 * @param {Boolean} ascending If true, sort ascending. If false, sort descending.
 */
export function sortObjectsByProp(objectsArr: any[], prop: string | number, ascending: boolean = true) {
    let objectsHaveProp = objectsArr.every((object) => object.hasOwnProperty(prop))
    if (objectsHaveProp) {
        let newObjectsArr = objectsArr.slice()
        newObjectsArr.sort((a, b) => {
            if (isNaN(Number(a[prop]))) {
                let textA = a[prop].toUpperCase(),
                    textB = b[prop].toUpperCase()
                if (ascending) {
                    return textA < textB ? -1 : textA > textB ? 1 : 0
                } else {
                    return textB < textA ? -1 : textB > textA ? 1 : 0
                }
            } else {
                return ascending ? a[prop] - b[prop] : b[prop] - a[prop]
            }
        })
        return newObjectsArr
    }
    return objectsArr
}

// Group array single dimention by the alphabetical key
export const groupArrayByAlphabet = (arr: any[]) => {
    return arr.reduce((acc, cur) => {
        const firstLetter = cur[0].toUpperCase()
        return { ...acc, [firstLetter]: [...(acc[firstLetter] || []), cur] }
    }, {})
}

/**
 * Group array object by the alphabetical key.
    {
        A: [ { name: 'Abigail', age: '25' } ],
        B: [ { name: 'Brianna', age: '25' } ],
        C: [ { name: 'Camila', age: '24' } ],
        D: [ { name: 'David', age: '22' } ]
    }
*/
export function groupArrayObjectByAlphabet(arr: any[]) {
    return arr.reduce((r, e) => {
        // get first letter of name of current element
        let alphabet = e.issuer[0].toUpperCase() // <- change `e.name` to whatever key you want
        // if there is no property in accumulator with this letter create it
        if (!r[alphabet]) r[alphabet] = [e]
        // if there is push current element to children array for that letter
        // else r[alphabet].record.push(e)
        // return accumulator
        return r
    }, {})
}

/**
 * Group array object by the alphabetical key
 * and return as array of objects.
 */
export function groupArrayObjectByAlphabetAsObject(arr: any[]) {
    let data = arr.reduce((r, e) => {
        // get first letter of name of current element
        let alphabet = e.name[0]

        // if there is no property in accumulator with this letter create it
        if (!r[alphabet]) r[alphabet] = { alphabet, record: [e] }
        // if there is push current element to children array for that letter
        else r[alphabet].record.push(e)

        // return accumulator
        return r
    }, {})

    return Object.values(data)
}

export interface IVault {
    user_id: string
    issuer: string
    user_identity: string
    secret_key: string
    algorithm: string
    token_type: string
    period: string
    digits: string
    token?: string
}

// TODO: fix this types
export async function parseVaults(data: any[]) {
    const arr = data.map(async (item) => {
        const token = await generateTOTP({
            secret: item.secret_key,
            period: item.period,
            digits: item.digits,
            algorithm: item.algorithm,
        })
        return { ...item, token }
    })

    const newData = await Promise.all(arr)
    const sortedData = sortObjectsByProp(newData, 'issuer')
    const groupedData = groupArrayObjectByAlphabet(sortedData)

    return groupedData
}
/**
 * Function to check if a character is alpha-numeric.
 *
 * @param {string} c
 * @return {boolean}
 */
export function isAlphaNumeric(str: string): boolean {
    /* Iterating character by character to get ASCII code for each character */
    for (let i = 0, len = str.length, code = 0; i < len; ++i) {
        /* Collecting charCode from i index value in a string */
        code = str.charCodeAt(i)

        /* Validating charCode falls into anyone category */
        if (
            (code > 47 && code < 58) || // numeric (0-9)
            (code > 64 && code < 91) || // upper alpha (A-Z)
            (code > 96 && code < 123) // lower alpha (a-z)
        ) {
            continue
        }

        /* If nothing satisfies then returning false */
        return false
    }

    /* After validating all the characters and we returning success message*/
    return true
}

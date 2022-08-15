import { faker } from '@faker-js/faker'
import { sortObjectsByProp, generateTOTP, groupArrayObjectByAlphabet } from './utils/helpers'

const generateMock = async (count: number): Promise<any> => {
    const result = []

    for (let i = 0; i < count; i++) {
        const id = faker.datatype.uuid()
        const issuer = faker.internet.domainName()
        const userId = faker.internet.email().toLowerCase()
        const secret = faker.random.alphaNumeric(40)
        const algorithm = 'sha1'
        const tokenType = 'TOTP'
        const period = 30
        const digits = 6

        // Create a new TOTP object.
        const token = await generateTOTP(secret)

        result.push({ id, issuer, userId, token, secret, algorithm, tokenType, period, digits })
    }

    return result
}

// Unsorted mock data.
export const randomData = await generateMock(100)

// Sort array with the custom function that sorts alphabetically by the name key
export const sortedData = sortObjectsByProp(randomData, 'issuer')

// Group array by the alphabetical key of the name key
export const vaultGrouped = groupArrayObjectByAlphabet(sortedData)

import { faker } from '@faker-js/faker'
import { generateTOTP } from './utils/helpers'

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

export const vault = {
    A: await generateMock(faker.datatype.number({ min: 3, max: 4 })),
    B: await generateMock(faker.datatype.number({ min: 1, max: 4 })),
    C: await generateMock(faker.datatype.number({ min: 1, max: 4 })),
}

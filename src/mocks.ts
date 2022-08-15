import { faker } from '@faker-js/faker'
// import * as OTPAuth from 'otpauth'

const generateMock = (count: number): any => {
    const result = []

    for (let i = 0; i < count; i++) {
        const id = faker.datatype.uuid()
        const issuer = faker.internet.domainName()
        const userId = faker.internet.email().toLowerCase()
        // const secret = OTPAuth.Secret.fromBase32(`NB2W45DFOIZ${i}`)
        const secret = `NB2W45DFOIZ${i}`
        const algorithm = 'SHA1'
        const tokenType = 'TOTP'
        const period = 30

        // Create a new TOTP object.
        // let otp = new OTPAuth.TOTP({
        //     label: issuer,
        //     digits: 6,
        //     issuer,
        //     algorithm,
        //     period,
        //     secret,
        // })

        // const token = otp.generate()
        const token = `12345${i}`

        result.push({ id, issuer, userId, token, secret, algorithm, tokenType, period })
    }
    return result
}

export const vault = {
    A: generateMock(faker.datatype.number({ min: 3, max: 4 })),
    // B: generateMock(faker.datatype.number({ min: 1, max: 4 })),
    // C: generateMock(faker.datatype.number({ min: 1, max: 4 })),
}

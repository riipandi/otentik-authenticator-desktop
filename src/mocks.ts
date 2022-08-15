import { faker } from '@faker-js/faker'

const generateMock = (count: number): any => {
    const result = []
    for (let i = 0; i < count; i++) {
        const id = faker.datatype.uuid()
        const name = faker.internet.domainName()
        const userId = faker.internet.email().toLowerCase()
        const token = faker.datatype.string(16)

        result.push({ id, name, userId, token })
    }
    return result
}

export const vault = {
    A: generateMock(faker.datatype.number({ min: 3, max: 4 })),
    B: generateMock(faker.datatype.number({ min: 1, max: 4 })),
    C: generateMock(faker.datatype.number({ min: 1, max: 4 })),
}

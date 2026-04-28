export const credentials = {
    username: 'standard_user',
    password: 'secret_sauce',
    invalidPassword: 'wrong_password',
    lockedUsername: 'locked_out_user'
}

import { faker } from "@faker-js/faker";
export function userData() {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        postalCode: faker.location.zipCode()
    };
}
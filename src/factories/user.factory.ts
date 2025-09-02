import { RegisterUserModel } from '../models/user.model';
import { faker } from '@faker-js/faker/locale/en';

export function prepareRandomUser(): RegisterUserModel {
  const registerUserData: RegisterUserModel = {
    userEmail: '',
    userPassword: faker.internet.password(),
  };

  registerUserData.userEmail = faker.internet.email({
    firstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
    lastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
  });

  return registerUserData;
}

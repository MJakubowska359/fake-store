import { LoginUserModel } from '../models/user.model';

export const testUser1: LoginUserModel = {
  userEmail: process.env.USER_EMAIL ?? '[NOT SET]',
  userPassword: process.env.USER_PASSWORD ?? '[NOT SET]',
};

export const without_password: LoginUserModel = {
  userEmail: process.env.USER_EMAIL ?? '[NOT SET]',
  userPassword: '',
};

export const incorrect_email: LoginUserModel = {
  userEmail: 'abracadabraTest@gmail.com',
  userPassword: process.env.USER_PASSWORD ?? '[NOT SET]',
};

export const incorrect_username: LoginUserModel = {
  userEmail: 'wingardium_leviosa',
  userPassword: process.env.USER_PASSWORD ?? '[NOT SET]',
};

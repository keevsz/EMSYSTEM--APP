import {AxiosResponse} from 'axios';
import {IUser} from './users';

export interface IAuthResponse extends AxiosResponse {
  data: IDataAuthResponse;
}

export interface IBackendTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface IDataAuthResponse {
  user: IUser;
  backendTokens: IBackendTokens;
}

interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
  isActive: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Student {
  _id: string;
  dni: string;
  birthdate: string;
  address: string;
  gender: string;
  user: User;
}

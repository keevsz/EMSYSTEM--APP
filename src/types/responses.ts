import {AxiosResponse} from 'axios';
import {IUser} from './users';

export interface IAuthResponse extends AxiosResponse {
  data: {
    user: IUser;
    backendTokens: IBackendTokens;
  };
}

export interface IBackendTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

import { IAuthUser } from './authUser.model';

export interface IAuthResponse {
     user: IAuthUser,
     token: string;
}
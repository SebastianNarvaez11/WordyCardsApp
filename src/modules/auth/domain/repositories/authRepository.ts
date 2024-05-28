import {mainApi} from '../../../../config/apis';
import {
  ICheckStatusResponse,
  ILoginFormFields,
  ILoginResponse,
  IRegisterFormFields,
  IRegisterUsersResponse,
} from '../../infrastructure/interfaces';

export class AuthRepository {
  static async login(data: ILoginFormFields) {
    return await mainApi.post<ILoginResponse>('/auth/login', data);
  }

  static async checkStatus() {
    return await mainApi.get<ICheckStatusResponse>('/auth/check-status');
  }

  static async registerUser(data: IRegisterFormFields) {
    return await mainApi.post<IRegisterUsersResponse>('/auth/register', data);
  }
}

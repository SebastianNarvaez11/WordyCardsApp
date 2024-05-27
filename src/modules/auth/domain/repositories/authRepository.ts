import {mainApi} from '../../../../config/apis';
import {
  IRegisterFormFields,
  IRegisterUsersResponse,
} from '../../infrastructure/interfaces';

export class AuthRepository {
  // static async login(plate: string) {
  //   return await customerApi.get<IAuthResponse>(
  //     `/Customer/Company/${COMPANY_ID}/Plate/${plate}`,
  //   );
  // }

  // static async checkStatus(plate: string) {
  //   return await customerApi.get<IAuthResponse>(
  //     `/Customer/Company/${COMPANY_ID}/Plate/${plate}`,
  //   );
  // }

  static async registerUser(data: IRegisterFormFields) {
    return await mainApi.post<IRegisterUsersResponse>('/auth/register', data);
  }
}

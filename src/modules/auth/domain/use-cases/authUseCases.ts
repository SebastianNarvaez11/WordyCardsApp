import {IRegisterFormFields} from '../../infrastructure/interfaces';
import {registerUserUseCase} from './registerUser';

export class AuthUseCases {
  // static login(plate: string) {
  //   return authLoginUseCase(plate);
  // }

  // static checkStatus(plate: string) {
  //   return authCheckStatusUseCase(plate);
  // }

  static registerUser(data: IRegisterFormFields) {
    return registerUserUseCase(data);
  }
}

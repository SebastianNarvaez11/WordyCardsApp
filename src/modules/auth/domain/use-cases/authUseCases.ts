import {
  ILoginFormFields,
  IRegisterFormFields,
} from '../../infrastructure/interfaces';
import {authCheckStatusUseCase} from './checkStatus';
import {loginUseCase} from './login';
import {registerUserUseCase} from './registerUser';

export class AuthUseCases {
  static login(data: ILoginFormFields) {
    return loginUseCase(data);
  }

  static checkStatus() {
    return authCheckStatusUseCase();
  }

  static registerUser(data: IRegisterFormFields) {
    return registerUserUseCase(data);
  }
}

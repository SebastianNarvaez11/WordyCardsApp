import {IUserModel} from '../../domain/models';
import {ICheckStatusResponse, ILoginResponse} from '../interfaces';

export class UserMapper {
  static fromLoginResponseToUserModel(response: ILoginResponse): IUserModel {
    return {
      id: response.user.id,
      name: response.user.name,
      email: response.user.email || '',
      image: response.user.image || '',
    };
  }

  static fromCheckingStatusResponseToUserModel(
    response: ICheckStatusResponse,
  ): IUserModel {
    return {
      id: response.user.id,
      name: response.user.name,
      email: response.user.email || '',
      image: response.user.image || '',
    };
  }
}

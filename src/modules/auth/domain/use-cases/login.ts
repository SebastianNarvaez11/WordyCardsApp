import {isAxiosError} from 'axios';

import {ILoginFormFields} from '../../infrastructure/interfaces';
import {UserMapper} from '../../infrastructure/mappers';
import {IUserModel} from '../models';
import {AuthRepository} from '../repositories';

export const loginUseCase = async (
  request: ILoginFormFields,
): Promise<{user: IUserModel; accessToken: string; refreshToken: string}> => {
  try {
    const {data} = await AuthRepository.login(request);

    return {
      user: UserMapper.fromLoginResponseToUserModel(data),
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  } catch (error) {
    console.log(error);
    throw new Error(
      isAxiosError(error)
        ? error.response?.data.message
        : 'Error al iniciar sesión',
    );
  }
};

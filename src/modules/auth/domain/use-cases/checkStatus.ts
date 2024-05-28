import {isAxiosError} from 'axios';

import {UserMapper} from '../../infrastructure/mappers';
import {IUserModel} from '../models';
import {AuthRepository} from '../repositories';

export const authCheckStatusUseCase = async (): Promise<{
  ok: boolean;
  user?: IUserModel;
  error?: string;
}> => {
  try {
    const {data} = await AuthRepository.checkStatus();

    return {
      ok: true,
      user: UserMapper.fromCheckingStatusResponseToUserModel(data),
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: isAxiosError(error)
        ? error.response?.data.message
        : 'Error al realizar la autenticación',
    };
  }
};

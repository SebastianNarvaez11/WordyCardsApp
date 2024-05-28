import {isAxiosError} from 'axios';

import {IRegisterFormFields} from '../../infrastructure/interfaces';
import {AuthRepository} from '../repositories';

export const registerUserUseCase = async (request: IRegisterFormFields) => {
  try {
    const {data} = await AuthRepository.registerUser(request);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(
      isAxiosError(error)
        ? error.response?.data.message
        : 'Error crear el usuario, inténtelo nuevo mas tarde',
    );
  }
};

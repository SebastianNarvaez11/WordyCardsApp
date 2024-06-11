import {isAxiosError} from 'axios';

import {ICreateGroupFormFields} from '../../infrastructure/interfaces';
import {GroupRepository} from '../repositories';

export const createGroupUseCase = async (request: ICreateGroupFormFields) => {
  try {
    await GroupRepository.createGroup(request);

    return true;
  } catch (error) {
    console.log({error});
    throw new Error(
      isAxiosError(error)
        ? error.response?.data.message
        : 'Error al crear el grupo',
    );
  }
};

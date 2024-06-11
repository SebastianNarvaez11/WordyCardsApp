import {isAxiosError} from 'axios';

import {ICreateGroupFormFields} from '../../infrastructure/interfaces';
import {GroupRepository} from '../repositories';

export const updateGroupUseCase = async (
  groupId: string,
  request: ICreateGroupFormFields,
) => {
  try {
    const {data} = await GroupRepository.updateGroup(groupId, request);

    return data;
  } catch (error) {
    console.log({error});
    throw new Error(
      isAxiosError(error)
        ? error.response?.data.message
        : 'Error al actualizar el grupo',
    );
  }
};

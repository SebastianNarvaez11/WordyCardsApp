import {isAxiosError} from 'axios';

import {GroupRepository} from '../repositories';

export const deleteGroupUseCase = async (groupId: string) => {
  try {
    await GroupRepository.deleteGroup(groupId);

    return true;
  } catch (error) {
    console.log({error});
    throw new Error(
      isAxiosError(error)
        ? error.response?.data.message
        : 'Error al eliminar el grupo',
    );
  }
};

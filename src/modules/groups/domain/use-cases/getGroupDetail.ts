import {isAxiosError} from 'axios';

import {GroupMapper} from '../../infrastructure/mappers';
import {GroupRepository} from '../repositories';

export const getGroupDetailUseCase = async (
  id: string,
  allExercises: boolean,
) => {
  try {
    const {data} = await GroupRepository.getGroupDetail(id, allExercises);

    return GroupMapper.fromGetGroupDetailResponseToGroupDetailModel(data);
  } catch (error) {
    console.log({error});
    throw new Error(
      isAxiosError(error)
        ? error.response?.data.message
        : 'Error al obtener el grupo',
    );
  }
};

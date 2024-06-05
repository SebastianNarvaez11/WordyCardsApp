import {isAxiosError} from 'axios';

import {GroupMapper} from '../../infrastructure/mappers';
import {GroupRepository} from '../repositories';

export const getGroupsUseCase = async (take: number, page: number) => {
  try {
    const {data} = await GroupRepository.getGroups(take, page);

    return {
      groups: data.groups.map(item =>
        GroupMapper.fromGetGroupResponseToGroupModel(item),
      ),
      totalGroups: data.totalGroups,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
    };
  } catch (error) {
    console.log(error);
    throw new Error(
      isAxiosError(error)
        ? error.response?.data.message
        : 'Error al obtener los grupos',
    );
  }
};

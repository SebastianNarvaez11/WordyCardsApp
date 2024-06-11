import {mainApi} from '../../../../config/apis';
import {
  ICreateGroupFormFields,
  IGetGroupDetailResponse,
  IGetGroupsResponse,
  IUpdateGroupResponse,
} from '../../infrastructure/interfaces';

export class GroupRepository {
  static async getGroups(take: number, page: number) {
    return await mainApi.get<IGetGroupsResponse>(
      `/groups?take=${take}&page=${page}`,
    );
  }

  static async getGroupDetail(id: string, allExercises: boolean) {
    return await mainApi.get<IGetGroupDetailResponse>(
      `/groups/${id}` + (allExercises ? '?all-exercises=true' : ''),
    );
  }

  static async createGroup(data: ICreateGroupFormFields) {
    return await mainApi.post('/groups/create', data);
  }

  static async updateGroup(groupId: string, data: ICreateGroupFormFields) {
    return await mainApi.put<IUpdateGroupResponse>(
      `/groups/update/${groupId}`,
      data,
    );
  }

  static async deleteGroup(groupId: string) {
    return await mainApi.delete(`/groups/delete/${groupId}`);
  }
}

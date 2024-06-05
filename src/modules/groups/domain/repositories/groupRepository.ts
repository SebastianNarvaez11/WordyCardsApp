import {mainApi} from '../../../../config/apis';
import {
  IGetGroupDetailResponse,
  IGetGroupsResponse,
} from '../../infrastructure/interfaces';

export class GroupRepository {
  static async getGroups(take: number, page: number) {
    return await mainApi.get<IGetGroupsResponse>(
      `/groups?take=${take}&page=${page}`,
    );
  }

  static async getGroupDetail(id: string) {
    return await mainApi.get<IGetGroupDetailResponse>(`/groups/${id}`);
  }
}

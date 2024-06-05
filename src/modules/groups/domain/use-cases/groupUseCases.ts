import {getGroupDetailUseCase} from './getGroupDetail';
import {getGroupsUseCase} from './getGroups';

export class GroupUseCases {
  static getGroups(take: number, page: number) {
    return getGroupsUseCase(take, page);
  }

  static getGroupDetail(id: string) {
    return getGroupDetailUseCase(id);
  }
}

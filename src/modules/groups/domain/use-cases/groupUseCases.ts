import {ICreateGroupFormFields} from '../../infrastructure/interfaces';
import {createGroupUseCase} from './createGroup';
import {deleteGroupUseCase} from './deleteGroup';
import {getGroupDetailUseCase} from './getGroupDetail';
import {getGroupsUseCase} from './getGroups';
import {updateGroupUseCase} from './updateGroup';

export class GroupUseCases {
  static getGroups(take: number, page: number) {
    return getGroupsUseCase(take, page);
  }

  static getGroupDetail(id: string, allExercises: boolean) {
    return getGroupDetailUseCase(id, allExercises);
  }

  static createGroup(data: ICreateGroupFormFields) {
    return createGroupUseCase(data);
  }

  static updateGroup(groupId: string, data: ICreateGroupFormFields) {
    return updateGroupUseCase(groupId, data);
  }

  static deleteGroup(groupId: string) {
    return deleteGroupUseCase(groupId);
  }
}

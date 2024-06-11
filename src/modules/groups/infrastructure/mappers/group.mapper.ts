import {IGroupDetailModel, IGroupModel} from '../../domain/models';
import {IGetGroupDetailResponse, IGroupResponse} from '../interfaces';

export class GroupMapper {
  static fromGetGroupResponseToGroupModel(
    response: IGroupResponse,
  ): IGroupModel {
    return {
      id: response.id,
      name: response.name,
      iconName: response.iconName || 'home',
      countExercises: response._count.exercises || 0,
      countEasy: response._countEasy || 0,
    };
  }

  static fromGetGroupDetailResponseToGroupDetailModel(
    response: IGetGroupDetailResponse,
  ): IGroupDetailModel {
    return {
      id: response.group.id,
      name: response.group.name,
      iconName: response.group.iconName || 'home',
      maxNumberOfExercisesPerRound:
        response.group.maxNumberOfExercisesPerRound || '20',
      exercises: response.group.exercises,
      countEasy: response.countEasy || 0,
      countMedium: response.countMedium || 0,
      countHard: response.countHard || 0,
    };
  }
}

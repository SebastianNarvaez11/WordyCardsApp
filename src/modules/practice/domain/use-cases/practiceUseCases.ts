import {IUpdateExerciseRequest} from '../../infrastructure/interfaces';
import {updateExerciseUseCase} from './updateExercise';

export class PracticeUseCases {
  static updateExercise(exerciseId: string, data: IUpdateExerciseRequest) {
    return updateExerciseUseCase(exerciseId, data);
  }
}

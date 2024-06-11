import {IUpdateExerciseRequest} from '../../infrastructure/interfaces';
import {deleteExerciseUseCase} from './deleteExercise';
import {updateExerciseUseCase} from './updateExercise';

export class PracticeUseCases {
  static updateExercise(exerciseId: string, data: IUpdateExerciseRequest) {
    return updateExerciseUseCase(exerciseId, data);
  }

  static deleteExercise(exerciseId: string) {
    return deleteExerciseUseCase(exerciseId);
  }
}

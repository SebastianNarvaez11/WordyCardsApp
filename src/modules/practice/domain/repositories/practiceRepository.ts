import {mainApi} from '../../../../config/apis';
import {
  IUpdateExerciseRequest,
  IUpdateExerciseResponse,
} from '../../infrastructure/interfaces';

export class PracticeRepository {
  static async updateExercise(
    exerciseId: string,
    data: IUpdateExerciseRequest,
  ) {
    return await mainApi.put<IUpdateExerciseResponse>(
      `/exercises/${exerciseId}`,
      data,
    );
  }
}

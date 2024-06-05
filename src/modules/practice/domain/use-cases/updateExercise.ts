import {isAxiosError} from 'axios';

import {IUpdateExerciseRequest} from '../../infrastructure/interfaces/exercise.requests';
import {PracticeRepository} from '../repositories';

export const updateExerciseUseCase = async (
  exerciseId: string,
  request: IUpdateExerciseRequest,
) => {
  try {
    const {data} = await PracticeRepository.updateExercise(exerciseId, request);

    return data.exercise;
  } catch (error) {
    console.log({error});
    throw new Error(
      isAxiosError(error)
        ? error.response?.data.message
        : 'Error al actualizar el ejercicio',
    );
  }
};

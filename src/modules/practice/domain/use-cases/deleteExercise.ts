import {isAxiosError} from 'axios';

import {PracticeRepository} from '../repositories';

export const deleteExerciseUseCase = async (exerciseId: string) => {
  try {
    await PracticeRepository.deleteExercise(exerciseId);

    return true;
  } catch (error) {
    console.log({error});
    throw new Error(
      isAxiosError(error)
        ? error.response?.data.message
        : 'Error al eliminar el ejercicio',
    );
  }
};

import {IExerciseModel} from '../../groups/domain/models';

export const isDuplicateExercise = (
  exercises: IExerciseModel[],
  id: string,
): boolean => {
  return exercises.filter(word => word.id === id).length > 1;
};

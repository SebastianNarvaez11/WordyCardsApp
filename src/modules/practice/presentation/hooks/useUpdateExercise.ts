import {useMutation} from '@tanstack/react-query';
import {Alert} from 'react-native';

import {PracticeUseCases} from '../../domain/use-cases';
import {IUpdateExerciseRequest} from '../../infrastructure/interfaces';

interface IRequestValues {
  exerciseId: string;
  data: IUpdateExerciseRequest;
}

export const useUpdateExercise = () => {
  const {mutate, isPending} = useMutation({
    mutationFn: (values: IRequestValues) =>
      PracticeUseCases.updateExercise(values.exerciseId, values.data),
    onError(error) {
      Alert.alert('Ocurrió un error', error.message);
    },
  });

  return {isLoading: isPending, mutate};
};

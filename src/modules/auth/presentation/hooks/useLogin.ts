import {useMutation} from '@tanstack/react-query';
import {Alert} from 'react-native';

import {useAuthStore} from '../../../../common/presentation/store';
import {ILoginFormFields} from '../../infrastructure/interfaces';

export const useLogin = () => {
  const {login} = useAuthStore();

  const {mutate, isPending} = useMutation({
    mutationFn: (values: ILoginFormFields) =>
      login(values.email, values.password),
    onError(error) {
      Alert.alert('Ocurrió un error', error.message);
    },
  });

  return {isLoading: isPending, mutate};
};

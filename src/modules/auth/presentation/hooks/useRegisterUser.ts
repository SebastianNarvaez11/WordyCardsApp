import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import {Alert} from 'react-native';

import {RootStackParams} from '../../../../common/presentation/navigation';
import {AuthRepository} from '../../domain/repositories';
import {IRegisterFormFields} from '../../infrastructure/interfaces';

export const useRegisterUser = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const {mutate, isPending} = useMutation({
    mutationFn: (values: IRegisterFormFields) =>
      AuthRepository.registerUser(values),
    onError(error) {
      Alert.alert('Ocurrió un error', error.message);
    },
    onSuccess() {
      navigation.navigate('LoginScreen');
    },
  });

  return {isLoading: isPending, mutate};
};

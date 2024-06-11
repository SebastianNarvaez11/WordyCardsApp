import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Alert} from 'react-native';

import {MainStackParams} from '../../../../common/presentation/navigation';
import {GroupUseCases} from '../../domain/use-cases';
import {ICreateGroupFormFields} from '../../infrastructure/interfaces';

export const useCreateGroup = () => {
  const navigation = useNavigation<NavigationProp<MainStackParams>>();
  const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation({
    mutationFn: (values: ICreateGroupFormFields) =>
      GroupUseCases.createGroup(values),
    onError(error) {
      Alert.alert('Ocurrió un error', error.message);
    },
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ['groups', 'infinite']});
      navigation.goBack();
    },
  });

  return {isLoading: isPending, mutate};
};

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Alert} from 'react-native';

import {MainStackParams} from '../../../../common/presentation/navigation';
import {GroupUseCases} from '../../domain/use-cases';
import {ICreateGroupFormFields} from '../../infrastructure/interfaces';

export const useUpdateGroup = () => {
  const navigation = useNavigation<NavigationProp<MainStackParams>>();
  const queryClient = useQueryClient();

  const {mutate, isPending} = useMutation({
    mutationFn: (values: {groupId: string; data: ICreateGroupFormFields}) =>
      GroupUseCases.updateGroup(values.groupId, values.data),
    onError(error) {
      Alert.alert('Ocurrió un error', error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({queryKey: ['groups', 'infinite']});
      queryClient.invalidateQueries({
        queryKey: ['group_detail', data.group.id],
      });
      navigation.goBack();
    },
  });

  return {isLoading: isPending, mutate};
};

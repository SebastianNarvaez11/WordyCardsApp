import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {useEffect} from 'react';
import {Alert} from 'react-native';

import {GroupUseCases} from '../../domain/use-cases';

export const useGetServiceDetail = (
  groupId: string | null,
  allExercises: boolean = false,
) => {
  const {isLoading, data, error} = useQuery({
    queryKey: ['group_detail', groupId],
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: !!groupId,
    queryFn: () => GroupUseCases.getGroupDetail(groupId || '', allExercises),
  });

  useEffect(() => {
    if (error as AxiosError) {
      Alert.alert('Error al obtener el grupo: ' + error?.message!);
    }
  }, [error]);

  return {isLoading, data: data};
};

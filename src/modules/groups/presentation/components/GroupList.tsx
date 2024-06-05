import BottomSheet from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FlashList} from '@shopify/flash-list';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import React, {FC, RefObject, useState} from 'react';
import {Platform, RefreshControl, StyleSheet} from 'react-native';
import IconIo from 'react-native-vector-icons/Ionicons';

import {Button, Spinner} from '../../../../common/presentation/components/ui';
import {MainStackParams} from '../../../../common/presentation/navigation';
import {useThemeStore} from '../../../../common/presentation/store';
import {GroupUseCases} from '../../domain/use-cases';
import {GroupItem} from './GroupItem';
import {GroupModalSheet} from './GroupModalSheet';

interface Props {
  groupModalRef: RefObject<BottomSheet>;
}

export const GroupList: FC<Props> = ({groupModalRef}) => {
  const {colors} = useThemeStore();
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<MainStackParams>>();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [groupId, setGroupId] = useState<string | null>(null);

  const {isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage} =
    useInfiniteQuery({
      queryKey: ['groups', 'infinite'],
      staleTime: 1000 * 60 * 60, // 1 hora
      initialPageParam: 1,
      queryFn: ({pageParam = 1}) => GroupUseCases.getGroups(10, pageParam),
      getNextPageParam: lastPage => {
        if (lastPage.currentPage === lastPage.totalPages) return undefined;
        return lastPage.currentPage + 1;
      },
    });

  const onPullToRefresh = () => {
    setIsRefreshing(true);
    queryClient.invalidateQueries({queryKey: ['groups', 'infinite']});
    setIsRefreshing(false);
  };

  return (
    <>
      <FlashList
        data={data?.pages.flatMap(page => page.groups) ?? []}
        contentContainerStyle={styles.scrollContainer}
        estimatedItemSize={190}
        showsVerticalScrollIndicator={false}
        onEndReached={() => (!hasNextPage || !isLoading) && fetchNextPage()}
        onEndReachedThreshold={0.2}
        numColumns={2}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({item}) => (
          <GroupItem
            {...item}
            onPress={() => {
              setGroupId(item.id);
              groupModalRef.current?.expand();
            }}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onPullToRefresh}
            tintColor={colors.primary200}
          />
        }
        // eslint-disable-next-line react/no-unstable-nested-components
        ListFooterComponent={() =>
          (isFetchingNextPage || isLoading) && (
            <Spinner size={40} color={colors.primary} />
          )
        }
      />

      <GroupModalSheet
        bottomSheetRef={groupModalRef}
        groupId={groupId}
        onClose={() => setGroupId(null)}
      />

      {!groupId && (
        <Button
          onPress={() => navigation.navigate('GroupCreateScreen')}
          style={[styles.addGroupButton, {backgroundColor: colors.primary}]}>
          <IconIo name="add" size={30} color={colors.white} />
        </Button>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {paddingBottom: 40},
  addGroupButton: {
    position: 'absolute',
    zIndex: 1,
    bottom: Platform.OS === 'android' ? 20 : 30,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

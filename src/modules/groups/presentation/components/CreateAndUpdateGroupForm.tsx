import {zodResolver} from '@hookform/resolvers/zod';
import {useQueryClient} from '@tanstack/react-query';
import {FC, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import IconIo from 'react-native-vector-icons/Ionicons';

import {iconsOptions} from '../../../../common/data/icons-options';
import {
  SelectFieldIcons,
  TextField,
} from '../../../../common/presentation/components/fields';
import {Button, Text} from '../../../../common/presentation/components/ui';
import {useThemeStore} from '../../../../common/presentation/store';
import {CreateGroupValidationSchema} from '../../../auth/infrastructure/validations';
import {UpdateGroupValidationSchema} from '../../../auth/infrastructure/validations/group.validation';
import {PracticeUseCases} from '../../../practice/domain/use-cases';
import {IGroupDetailModel} from '../../domain/models';
import {GroupUseCases} from '../../domain/use-cases';
import {
  ICreateGroupFormFields,
  IUpdateExerciseFormFields,
} from '../../infrastructure/interfaces';
import {useCreateGroup, useUpdateGroup} from '../hooks';
import {CreateExerciseForm} from './CreateExerciseForm';

interface Props {
  group?: IGroupDetailModel;
  isUpdate?: boolean;
}

export const CreateAndUpdateGroupForm: FC<Props> = ({
  group,
  isUpdate = false,
}) => {
  const {colors} = useThemeStore();

  const queryClient = useQueryClient();
  const {isLoading, mutate} = useCreateGroup();
  const {isLoading: isUpdating, mutate: updateMutate} = useUpdateGroup();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm<ICreateGroupFormFields>({
    resolver: zodResolver(
      isUpdate ? UpdateGroupValidationSchema : CreateGroupValidationSchema,
    ),
    defaultValues: {
      iconName: group?.iconName || '',
      name: group?.name || '',
      maxNumberOfExercisesPerRound: String(
        group?.maxNumberOfExercisesPerRound || 20,
      ),
      exercises: group?.exercises || [],
    },
  });

  const onRemoveExercise = async (
    exercise: Partial<IUpdateExerciseFormFields>,
  ) => {
    if ((watch('exercises')?.length || 0) <= 1 && isUpdate) {
      return Alert.alert(
        'Ups!',
        'No puedes tener un grupo sin palabras, si deseas puedes borrar el grupo',
      );
    }

    setValue(
      'exercises',
      watch('exercises')?.filter(item => item !== exercise) || [],
    );
    if (exercise?.id && group?.id) {
      await PracticeUseCases.deleteExercise(exercise.id);
      queryClient.invalidateQueries({queryKey: ['groups', 'infinite']});
      queryClient.invalidateQueries({
        queryKey: ['group_detail', group.id],
      });
    }
  };

  useEffect(() => {
    const getAllExercises = async () => {
      if (group?.id) {
        const data = await GroupUseCases.getGroupDetail(group?.id || '', true);
        setValue('exercises', data.exercises);
      }
    };
    getAllExercises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group]);

  const onRegister = (values: ICreateGroupFormFields) => {
    if (!watch('exercises')?.length)
      return Alert.alert('Ups!', 'Debes agregar por lo menos una palabra');

    if ((watch('exercises')?.length || 0) > 50) {
      return Alert.alert('Ups!', 'Solo puedes agregar 50 palabras por grupo');
    }

    if (isUpdate) {
      if (group?.id) {
        updateMutate({groupId: group.id, data: values});
      }
    } else {
      mutate(values);
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextField
        label="Nombre del grupo"
        control={control}
        error={errors.name?.message}
        name="name"
        placeholder={'Ej: Verbos regulares, Animales'}
      />

      <SelectFieldIcons
        control={control}
        name="iconName"
        options={iconsOptions}
        error={errors.iconName?.message}
        label="Selecciona un icono para el grupo"
      />

      <TextField
        keyboardType="numeric"
        label="Cantidad maxima de palabras por ronda"
        control={control}
        error={errors.maxNumberOfExercisesPerRound?.message}
        name="maxNumberOfExercisesPerRound"
        placeholder={'Ej: 10'}
      />

      <Text text={'Palabras:'} size={14} font="Quicksand-Bold" />

      <View style={[styles.containerWords, {borderColor: colors.text}]}>
        <CreateExerciseForm
          onAdd={newExercise =>
            setValue('exercises', [newExercise, ...(watch('exercises') || [])])
          }
        />

        <View style={[styles.separator, {backgroundColor: colors.gray100}]} />

        {!watch('exercises')?.length && (
          <Text
            text={'Agrega las palabras que deseas estudiar en este grupo'}
            size={15}
            font="Quicksand-Light"
            color={colors.gray}
            align="center"
            style={styles.emptyWordsText}
          />
        )}

        {watch('exercises')?.map((item, index) => (
          <View
            style={[
              styles.exerciseItem,
              {backgroundColor: colors.backgroundPrimary},
            ]}
            key={item.englishWord + index}>
            <Text
              text={index + 1 + '. '}
              size={15}
              font="Quicksand-SemiBold"
              width={'90%'}>
              <Text
                text={item.englishWord + ' - ' + item.spanishTranslation}
                size={16}
              />
            </Text>

            <Pressable onPress={() => onRemoveExercise(item)}>
              <IconIo name="close-circle" size={25} color={colors.danger} />
            </Pressable>
          </View>
        ))}
      </View>

      <Button
        label={isUpdate ? 'Actualizar grupo' : 'Crear grupo'}
        onPress={handleSubmit(onRegister)}
        isLoading={isLoading || isUpdating}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    gap: 15,
    marginTop: 30,
    marginBottom: 20,
  },
  containerWords: {
    flex: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 15,
    padding: 20,
  },
  emptyWordsText: {
    marginTop: 20,
  },
  separator: {
    height: 1,
    marginVertical: 10,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 5,
  },
});

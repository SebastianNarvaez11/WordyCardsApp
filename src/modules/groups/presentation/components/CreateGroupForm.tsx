import {zodResolver} from '@hookform/resolvers/zod';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Pressable, StyleSheet, View} from 'react-native';
import IconIo from 'react-native-vector-icons/Ionicons';

import {iconsOptions} from '../../../../common/data/icons-options';
import {
  SelectFieldIcons,
  TextField,
} from '../../../../common/presentation/components/fields';
import {Button, Text} from '../../../../common/presentation/components/ui';
import {useThemeStore} from '../../../../common/presentation/store';
import {CreateGroupValidationSchema} from '../../../auth/infrastructure/validations';
import {
  ICreateExerciseFormFields,
  ICreateGroupFormFields,
} from '../../infrastructure/interfaces';
import {CreateExerciseForm} from './CreateExerciseForm';

export const CreateGroupForm = () => {
  const {colors} = useThemeStore();

  const [exercises, setExercises] = useState<ICreateExerciseFormFields[]>([]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ICreateGroupFormFields>({
    resolver: zodResolver(CreateGroupValidationSchema),
    defaultValues: {
      iconName: '',
      name: '',
      maxNumberOfExercisesPerRound: 0,
    },
  });

  const onRemoveExercise = (exercise: ICreateExerciseFormFields) => {
    setExercises(exercises.filter(item => item !== exercise));
  };

  const onRegister = (values: ICreateGroupFormFields) => {
    console.log(values);
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
          onAdd={newExercise => setExercises([...exercises, newExercise])}
        />

        <View style={[styles.separator, {backgroundColor: colors.gray100}]} />

        {!exercises.length && (
          <Text
            text={'Agrega las palabras que deseas estudiar en este grupo'}
            size={15}
            font="Quicksand-Light"
            color={colors.gray}
            align="center"
            style={styles.emptyWordsText}
          />
        )}

        {exercises.map((item, index) => (
          <View
            style={[
              styles.exerciseItem,
              {backgroundColor: colors.backgroundPrimary},
            ]}
            key={item.englishWord + index}>
            <Text
              text={item.englishWord + ' - ' + item.spanishTranslation}
              size={16}
            />

            <Pressable onPress={() => onRemoveExercise(item)}>
              <IconIo name="close-circle" size={25} color={colors.danger} />
            </Pressable>
          </View>
        ))}
      </View>

      <Button
        label="Crear grupo"
        onPress={handleSubmit(onRegister)}
        // isLoading={isLoading}
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

import {zodResolver} from '@hookform/resolvers/zod';
import {FC} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';

import {TextField} from '../../../../common/presentation/components/fields';
import {Button} from '../../../../common/presentation/components/ui';
import {useThemeStore} from '../../../../common/presentation/store';
import {ExerciseUpdateValidationSchema} from '../../../auth/infrastructure/validations';
import {ICreateExerciseFormFields} from '../../infrastructure/interfaces';

interface Props {
  onAdd: (exercise: ICreateExerciseFormFields) => void;
}

export const CreateExerciseForm: FC<Props> = ({onAdd}) => {
  const {colors} = useThemeStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<ICreateExerciseFormFields>({
    resolver: zodResolver(ExerciseUpdateValidationSchema),
    defaultValues: {
      englishWord: '',
      spanishTranslation: '',
      image: '',
    },
  });

  const onRegister = (values: ICreateExerciseFormFields) => {
    reset();
    onAdd(values);
  };

  return (
    <View style={styles.formContainer}>
      <TextField
        label="Palabra en ingles"
        control={control}
        error={errors.englishWord?.message}
        name="englishWord"
        placeholder={'Ej: dog, to work'}
      />

      <TextField
        label="Traducción en español"
        control={control}
        error={errors.spanishTranslation?.message}
        name="spanishTranslation"
        placeholder={'Ej: perro, trabajar'}
      />

      <TextField
        label="URL de la imagen o gif"
        control={control}
        error={errors.image?.message}
        name="image"
        placeholder={'www.imagen.com/dog.gif'}
      />

      <Button
        color={colors.success}
        height={30}
        label="Agregar"
        onPress={handleSubmit(onRegister)}
        // isLoading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    gap: 15,
  },
});

import {zodResolver} from '@hookform/resolvers/zod';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';

import {TextField} from '../../../../common/presentation/components/fields';
import {Button} from '../../../../common/presentation/components/ui';
import {ILoginFormFields} from '../../infrastructure/interfaces';
import {LoginValidationSchema} from '../../infrastructure/validations';

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ILoginFormFields>({
    resolver: zodResolver(LoginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <View style={styles.formContainer}>
      <TextField
        label="Email"
        control={control}
        error={errors.email?.message}
        name="plate"
        placeholder={'abc@abc.com'}
      />

      <TextField
        secureTextEntry={true}
        label="Contraseña"
        control={control}
        error={errors.password?.message}
        name="password"
        placeholder={'*************'}
      />

      <Button label="Ingresar" />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    gap: 15,
    marginTop: 30,
    marginBottom: 20,
  },
});

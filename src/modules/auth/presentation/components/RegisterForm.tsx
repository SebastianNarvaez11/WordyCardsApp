import {zodResolver} from '@hookform/resolvers/zod';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';

import {TextField} from '../../../../common/presentation/components/fields';
import {Button} from '../../../../common/presentation/components/ui';
import {IRegisterFormFields} from '../../infrastructure/interfaces';
import {RegisterValidationSchema} from '../../infrastructure/validations';
import {useRegisterUser} from '../hooks';

export const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IRegisterFormFields>({
    resolver: zodResolver(RegisterValidationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const {isLoading, mutate} = useRegisterUser();

  const onRegister = (values: IRegisterFormFields) => {
    mutate(values);
  };

  return (
    <View style={styles.formContainer}>
      <TextField
        label="Nombre"
        control={control}
        error={errors.name?.message}
        name="name"
        placeholder={'Tu nombre'}
      />

      <TextField
        label="Email"
        control={control}
        error={errors.email?.message}
        name="email"
        placeholder={'abc@abc.com'}
      />

      <TextField
        secureTextEntry={true}
        label="Contraseña"
        control={control}
        error={errors.password?.message}
        name="password"
        placeholder={'******'}
      />

      <TextField
        secureTextEntry={true}
        label="Confirma la contraseña"
        control={control}
        error={errors.confirmPassword?.message}
        name="confirmPassword"
        placeholder={'******'}
      />

      <Button
        label="Registrarse"
        onPress={handleSubmit(onRegister)}
        isLoading={isLoading}
      />
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

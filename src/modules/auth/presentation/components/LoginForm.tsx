import {zodResolver} from '@hookform/resolvers/zod';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';

import {TextField} from '../../../../common/presentation/components/fields';
import {Button} from '../../../../common/presentation/components/ui';
import {ILoginFormFields} from '../../infrastructure/interfaces';
import {LoginValidationSchema} from '../../infrastructure/validations';
import {useLogin} from '../hooks';

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

  const {isLoading, mutate} = useLogin();

  const onLogin = (values: ILoginFormFields) => {
    mutate(values);
  };

  return (
    <View style={styles.formContainer}>
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
        placeholder={'*************'}
      />

      <Button
        label="Ingresar"
        onPress={handleSubmit(onLogin)}
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

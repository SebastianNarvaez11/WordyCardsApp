import {ZodType, z} from 'zod';

import {
  ICreateGroupFormFields,
  IUpdateGroupFormFields,
} from '../../../groups/infrastructure/interfaces';
import {
  ExerciseCreateValidationSchema,
  ExerciseUpdateValidationSchema,
} from './exercise.validation';

export const CreateGroupValidationSchema: ZodType<ICreateGroupFormFields> =
  z.object({
    name: z
      .string()
      .min(1, {message: 'Este campo es requerido'})
      .max(32, {message: 'El máximo de caracteres es de 32'}),

    iconName: z.string(),

    maxNumberOfExercisesPerRound: z
      .string()
      .regex(/^\d+$/, {
        message: 'Ingrese solo números',
      })
      .min(1, {message: 'Este campo es requerido'})
      .max(2, {message: 'El máximo de palabras es de 99'}),

    exercises: z.array(ExerciseCreateValidationSchema),
  });

export const UpdateGroupValidationSchema: ZodType<IUpdateGroupFormFields> =
  z.object({
    name: z
      .string()
      .min(1, {message: 'Este campo es requerido'})
      .max(32, {message: 'El máximo de caracteres es de 32'})
      .optional(),

    iconName: z.string().optional(),

    maxNumberOfExercisesPerRound: z
      .string()
      .regex(/^\d+$/, {
        message: 'Ingrese solo números',
      })
      .min(1, {message: 'Este campo es requerido'})
      .max(2, {message: 'El máximo de palabras es de 99'})
      .optional(),

    exercises: z.array(ExerciseUpdateValidationSchema).optional(),
  });

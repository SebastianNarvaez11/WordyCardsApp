import {ZodType, z} from 'zod';

import {
  ICreateExerciseFormFields,
  IUpdateExerciseFormFields,
} from '../../../groups/infrastructure/interfaces';

export const ExerciseCreateValidationSchema: ZodType<ICreateExerciseFormFields> =
  z.object({
    englishWord: z
      .string()
      .min(1, {message: 'Este campo es requerido'})
      .max(32, {message: 'El máximo de caracteres es de 32'}),

    spanishTranslation: z
      .string()
      .min(1, {message: 'Este campo es requerido'})
      .max(32, {message: 'El máximo de caracteres es de 32'}),

    image: z.string().optional(),
  });

export const ExerciseUpdateValidationSchema: ZodType<IUpdateExerciseFormFields> =
  z.object({
    id: z.string().optional(),
    englishWord: z
      .string()
      .min(1, {message: 'Este campo es requerido'})
      .max(32, {message: 'El máximo de caracteres es de 32'}),

    spanishTranslation: z
      .string()
      .min(1, {message: 'Este campo es requerido'})
      .max(32, {message: 'El máximo de caracteres es de 32'}),

    image: z.string().optional().nullable(),

    // rating: z.number().optional(),

    // updateAt: z.date().optional(),
  });

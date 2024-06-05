import {ZodType, z} from 'zod';

import {ICreateExerciseFormFields} from '../../../groups/infrastructure/interfaces';

export const ExerciseUpdateValidationSchema: ZodType<ICreateExerciseFormFields> =
  z.object({
    englishWord: z
      .string()
      .min(1, {message: 'Este campo es requerido'})
      .max(32, {message: 'El máximo de caracteres es de 32'}),

    spanishTranslation: z
      .string()
      .min(1, {message: 'Este campo es requerido'})
      .max(32, {message: 'El máximo de caracteres es de 32'}),
  });

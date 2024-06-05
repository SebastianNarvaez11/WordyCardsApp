import {ZodType, z} from 'zod';

import {ICreateGroupFormFields} from '../../../groups/infrastructure/interfaces';

export const CreateGroupValidationSchema: ZodType<ICreateGroupFormFields> =
  z.object({
    name: z
      .string()
      .min(1, {message: 'Este campo es requerido'})
      .max(32, {message: 'El máximo de caracteres es de 32'}),

    iconName: z.string(),

    maxNumberOfExercisesPerRound: z
      .number({message: 'Ingresa un valor numérico'})
      .min(10, {message: 'La calificación minima es 10'})
      .max(50, {message: 'La calificación maxima es 50'}),
  });

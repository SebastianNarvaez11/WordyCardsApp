export interface ICreateGroupFormFields {
  name: string;
  iconName: string;
  maxNumberOfExercisesPerRound: string;
  exercises?: ICreateExerciseFormFields[];
}

export interface IUpdateGroupFormFields {
  name?: string;
  iconName?: string;
  maxNumberOfExercisesPerRound?: string;
  exercises?: IUpdateExerciseFormFields[];
}

export interface ICreateExerciseFormFields {
  englishWord: string;
  spanishTranslation: string;
  image?: string;
}

export interface IUpdateExerciseFormFields {
  id?: string;
  englishWord: string;
  spanishTranslation: string;
  image?: string | null;
}

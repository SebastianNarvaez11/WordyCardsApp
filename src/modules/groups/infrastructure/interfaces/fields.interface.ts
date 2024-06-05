export interface ICreateGroupFormFields {
  name: string;
  iconName: string;
  maxNumberOfExercisesPerRound: number;
}

export interface ICreateExerciseFormFields {
  englishWord: string;
  spanishTranslation: string;
  image?: string;
}

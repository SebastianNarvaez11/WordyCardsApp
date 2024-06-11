export interface IGroupModel {
  id: string;
  name: string;
  iconName: string;
  countExercises: number;
  countEasy: number;
}

export interface IGroupDetailModel {
  id: string;
  name: string;
  iconName: string;
  maxNumberOfExercisesPerRound: string;
  exercises: IExerciseModel[];
  countEasy: number;
  countMedium: number;
  countHard: number;
}

export interface IExerciseModel {
  id: string;
  englishWord: string;
  spanishTranslation: string;
  image: string;
  rating: number;
}

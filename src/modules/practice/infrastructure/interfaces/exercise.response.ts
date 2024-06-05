export interface IUpdateExerciseResponse {
  exercise: IUpdatedExercise;
}

interface IUpdatedExercise {
  id: string;
  englishWord: string;
  spanishTranslation: string;
  rating: number;
  deleted: boolean;
  createdAt: Date;
  updateAt: Date;
  groupId: string;
  userId: string;
}

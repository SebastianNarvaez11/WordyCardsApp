export interface IGetGroupsResponse {
  groups: IGroupResponse[];
  totalGroups: number;
  currentPage: number;
  totalPages: number;
}

export interface IGroupResponse {
  id: string;
  iconName: null;
  name: string;
  _count: Count;
  _countEasy: number;
}

interface Count {
  exercises: number;
}

export interface IGetGroupDetailResponse {
  group: GroupDetail;
  countEasy: number;
  countMedium: number;
  countHard: number;
}

interface GroupDetail {
  id: string;
  name: string;
  iconName: string;
  maxNumberOfExercisesPerRound: string;
  exercises: Exercise[];
}

interface Exercise {
  id: string;
  englishWord: string;
  spanishTranslation: string;
  image: string;
  rating: number;
}

export interface IUpdateGroupResponse {
  group: {
    id: string;
    name: string;
    iconName: string | null;
    maxNumberOfExercisesPerRound: number;
    deleted: boolean;
    createdAt: Date;
    updateAt: Date;
    userId: string;
  };
}

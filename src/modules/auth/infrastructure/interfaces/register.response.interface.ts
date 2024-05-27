export interface IRegisterUsersResponse {
  user: UserResponse;
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  image: null;
  isActive: boolean;
  deleted: boolean;
  createdAt: Date;
  updateAt: Date;
}

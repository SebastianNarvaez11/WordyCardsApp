export interface ILoginResponse {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
}

export interface ICheckStatusResponse {
  user: UserResponse;
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
  image: null;
  isActive: boolean;
  deleted: boolean;
}

export type IAuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

export interface IRefreshTokenResponse {
  newAccessToken: string;
}

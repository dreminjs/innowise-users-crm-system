export interface ITokensState {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (payload: string | null) => void;
  setRefreshToken: (payload: string | null) => void;
  deleteAccessToken: () => void;
}

import { UserInfoType, UserProfileType } from 'src/redux/reducers/users';
import { SigninReqType, SignupReqType } from 'src/redux/sagas/authSaga';
import { appApi } from './AppApi';

export interface confirmEmailType {
  email: string;
  authToken: string;
}

interface confirmPasswordType {
  authToken: string;
  email: string;
  password: string;
}

interface sendEmailType {
  email: string;
}

export interface patchProfileType {
  data: FormData;
}

export interface patchPasswordType {
  oldPassword: string;
  newPassword: string;
}

export class UserService {
  public static async signup(reqData: SignupReqType) {
    await appApi.post(`/user`, reqData);
  }

  public static async confirmEmail(reqData: confirmEmailType): Promise<string> {
    const response = await appApi.post(`/user/confirm`, reqData);
    return response.data.data; // jwt
  }

  public static async reissueEmailAuthToken(
    reqData: sendEmailType
  ): Promise<string> {
    const response = await appApi.post(`/user/reissue`, reqData);
    return response.data.data; // boolean
  }

  public static async initPasswordRequest(
    reqData: sendEmailType
  ): Promise<boolean> {
    const response = await appApi.post(`/common/password/init`, reqData);
    return response.data.data; // boolean
  }

  public static async confirmPassword(
    reqData: confirmPasswordType
  ): Promise<string> {
    const response = await appApi.patch(`/common/password/confirm`, reqData);
    return response.data.data; // jwt
  }

  public static async signin(reqData: SigninReqType): Promise<string> {
    const response = await appApi.post(`/common/login`, reqData);
    return response.data.data;
  }

  public static async signOut(): Promise<void> {
    await appApi.get(`/common/logout`);
  }

  public static async getUserInfo(): Promise<UserInfoType> {
    const response = await appApi.get(`/user/info`);
    return response.data.data ?? null;
  }

  public static async getUserProfile(): Promise<UserProfileType> {
    const response = await appApi.get(`/user`);
    return response.data.data ?? null;
  }

  public static async patchUserProfile(
    reqData: patchProfileType['data']
  ): Promise<void> {
    await appApi.patch(`/user`, reqData);
  }

  public static async patchPassword(reqData: patchPasswordType): Promise<void> {
    await appApi.patch(`/user/password`, reqData);
  }

  public static async deleteUser(): Promise<void> {
    await appApi.delete(`/user`);
  }
}

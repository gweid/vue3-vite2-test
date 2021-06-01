export interface IUserInfo {
  name: string,
  age: number,
  phone?: string
}

export interface IRootState {
  userInfo: IUserInfo
}

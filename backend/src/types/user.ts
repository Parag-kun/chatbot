export interface IUser {
  email: string;
  password: string;
  role: UserRoles;
}

export enum UserRoles {
  ADMIN = "ADMIN",
  USER = "USER",
}

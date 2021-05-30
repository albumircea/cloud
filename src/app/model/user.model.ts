export class User {
  email?: string;
  password?: string;
  token?: string;
  id?: number;
  role?: string;
}

export class UserOutput{
  id: number| undefined;
  username: string| undefined;
  firstName: string| undefined;
  lastName: string| undefined;
  token: string| undefined;
}

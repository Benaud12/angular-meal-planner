export interface NewUser {
  email: string;
  password: string;
  passwordConfirm?: string;
  username?: string;
}

export interface NewUserAuth {
  email: string;
  password: string;
}

export interface NewUserDatabase {
  uid: string;
  username: string
}

export interface CreateUserResponse {
  uid: string;
  databaseEntryCreated: boolean;
}

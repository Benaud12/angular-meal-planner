export interface NewUser {
  email: string;
  password: string;
  passwordConfirm?: string;
  username?: string;
}

export interface UserAuth {
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

export interface UserUpdateDetails {
  displayName: string | null,
  photoURL: string | null
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password?: string;
  role?: "contributor" | "maintainer";
}

export interface ILoginPayload {
  email: string;
  password?: string;
}

export interface IUserRes {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

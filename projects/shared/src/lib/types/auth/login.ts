import { User } from "../user/user";

export type LoginResponse = {
  token: string;
  user: User;
};

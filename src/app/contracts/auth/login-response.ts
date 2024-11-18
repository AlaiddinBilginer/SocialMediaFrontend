import { Token } from "../../models/token";

export interface LoginResponse {
  message: string;
  succeeded: boolean;
  token: Token;
}
export interface UserPayload {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}

import { JwtPayload } from '../auth/types/user-jwt-payload';

declare global {
  namespace Express {
    interface User extends JwtPayload {}
  }
}

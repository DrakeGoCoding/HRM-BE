import { UserRole } from '@/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: number;
  username: string;
  role: UserRole;
}

class Authentication {
  public static hashPassword(password: string): string {
    return bcrypt.hashSync(
      password,
      bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS))
    );
  }

  public static comparePassword(
    password: string,
    hashedPassword: string
  ): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }

  public static generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  }

  public static validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      return decoded as TokenPayload;
    } catch (error) {
      return null;
    }
  }
}

export default Authentication;

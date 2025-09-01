import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId: string, email: string, role: string): string => {
  return jwt.sign({ userId, email, role }, JWT_SECRET, { expiresIn: '7d' });
};

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
};
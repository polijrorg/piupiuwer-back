import { Request, Response, NextFunction } from 'express';
import { Secret, verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '../../../../config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  iss: string;
}

export default function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('JWT token is missing', 401);

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret as Secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('JWT token is missing', 401);
  }
}

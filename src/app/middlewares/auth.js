import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'Error token' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decode = await promisify(jwt.verify)(token, authConfig.secret);
    request.userId = decode.id;
    return next();
  } catch (error) {
    return response.status(401).json({ error: 'Token inválido' });
  }
};

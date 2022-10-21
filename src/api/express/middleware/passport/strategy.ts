import { Request } from 'express';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { privateKeyPath } from '../../../../core/shared/infrastructure/adapters/jwt/config';
import fs from 'fs';
import InMemoryUserRepository from '../../../../core/user/infrastructure/inMemoryUserRepository';

const cookieExtractor = (req: Request) => {
  let jwt = null 

  if (req && req.cookies) {
      jwt = req.cookies['jwt']
  }
  return jwt
}

const privateKey = fs.readFileSync(privateKeyPath)

export default new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: privateKey,
  },
  async (payload, done) => {
    try {
      const inMemoryUserRepository = new InMemoryUserRepository();
      const user = await inMemoryUserRepository.findByEmail(payload.email);
      if (!user) {
        return done(null, false)
      }
      return done(null, user)
    } catch (error) {
      console.log(error)
      done(error, false)
    }
  }
)
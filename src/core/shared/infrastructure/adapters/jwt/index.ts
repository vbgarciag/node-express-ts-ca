
import * as jwt from 'jsonwebtoken'
import fs from 'fs'
import { privateKeyPath } from './config';
import { TokenService } from '../../../domain/services/token';

const privateKey = fs.readFileSync(privateKeyPath)

export default class JsonWebToken<T> implements TokenService<T> {
  async generateToken(payload: T, expiresIn?: number): Promise<string> {
    const defaultExpires: number = expiresIn || 3600
    return jwt.sign(payload as Object, privateKey, { expiresIn: defaultExpires })
  }

  async generateRefreshToken (user: Partial<T>, expiresIn?: number): Promise<string> {
    const defaultExpires: number = expiresIn ?? 3600
    return jwt.sign(user, privateKey, { expiresIn: defaultExpires })
  }

  async verifyToken(token: string): Promise<T> {
    return jwt.verify(token, privateKey) as T
  }

  async refreshToken(token: string): Promise<string> {
    return jwt.sign(await this.verifyToken(token) as Object, privateKey)
  }
}
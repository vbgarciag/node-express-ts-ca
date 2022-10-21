export interface TokenService<T> {
  generateToken(payload: Partial<T>, expiresIn?: number): Promise<string>
  generateRefreshToken(payload: Partial<T>, expiresIn?: number): Promise<string>
  verifyToken(token: string): Promise<T | null>
  refreshToken(token: string): Promise<string>
}
export interface PasswordEncrypterService {
  encryptPassword: (password: string) => Promise<{ hash: string, salt?: string }>
  comparePassword: (password: string, passwordHash: string, passwordSalt?: string) => Promise<boolean>
}
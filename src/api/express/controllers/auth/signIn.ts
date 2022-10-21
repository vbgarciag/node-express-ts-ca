import { Request, Response, NextFunction, Router } from "express";
import { autoInjectable } from "tsyringe";
import SignInUseCase from "../../../../core/auth/application/signIn";
import RequestConflictError from "../../../../core/shared/domain/exceptions/RequestConflictError";

@autoInjectable()
export default class SignInController {
  public path : string = '/auth';
  public router: Router;

  constructor(private readonly signInUseCase: SignInUseCase) {
    this.router = Router();
    this.router.post('/sign-in', this.handle.bind(this));
  }

  async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      if (!request.body.email || !request.body.password) {
        throw new RequestConflictError('Please provide email and password');
      }

      const { email, password } = request.body;

      const payload = await this.signInUseCase.execute({
        email,
        password
      });
      response.cookie('jwt', payload.token, { httpOnly: true, secure: true });
      response.status(200).json({ data: payload.user });
    } catch (error) {
      next(error)
    }
  }
}
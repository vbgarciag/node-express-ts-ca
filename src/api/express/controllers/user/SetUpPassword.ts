import { autoInjectable } from 'tsyringe';
import { Request, Response, NextFunction, Router } from "express";
import { SetUpPassword } from "../../../../core/user/application/setUpPassword";

@autoInjectable()
export default class SetUpPasswordController {
  public path : string = '/users';
  public router: Router;

  constructor(private readonly createUserUseCase: SetUpPassword) {
    this.router = Router();
    this.router.post('/setup-password', this.handle.bind(this));
  }

  async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { password, token } = request.body;

      await this.createUserUseCase.execute({
        password,
        token
      });

      response.status(201).json({
        message: 'Password set up successfully'
      });
    } catch (error) {
      next(error)
    }
  }
}
import { Request, Response, NextFunction, Router } from "express";
import { autoInjectable } from 'tsyringe';
import { FindOneUserUseCase } from "../../../../core/user/application/findOneUser";

@autoInjectable()
export default class FindOneUserController {
  public path : string = '/users';
  public router: Router;

  constructor(private readonly findAllUsersUseCase: FindOneUserUseCase) {
    this.router = Router();
    this.router.get('/:id', this.handle.bind(this));
  }

  async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = request.params;
      const user = await this.findAllUsersUseCase.execute(id);
      response.status(200).json({
        data: user
      });
    } catch (error) {
      next(error)
    }
  }
}
import { Request, Response, NextFunction, Router } from "express";
import { autoInjectable } from "tsyringe";
import { RemoveUserUseCase } from "../../../../../application/usecase/user/remove";

@autoInjectable()
export default class RemoveUserController {
  public path : string = '/users';
  public router: Router;

  constructor(private readonly removeUserUseCase: RemoveUserUseCase) {
    this.router = Router();
    this.router.delete('/:id', this.handle.bind(this));
  }

  async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const id = request.params.id;
      await this.removeUserUseCase.execute(id);
      response.status(200).json({
        message: 'User removed successfully'
      });
    } catch (error) {
      next(error)
    }
  }
}
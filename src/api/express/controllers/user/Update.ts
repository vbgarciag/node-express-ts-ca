import { Request, Response, NextFunction, Router } from "express";
import { autoInjectable } from 'tsyringe';
import { UpdateUserUseCase } from "../../../../core/user/application/updateUser";

@autoInjectable()
export default class UpdateUserController {
  public path : string = '/users';
  public router: Router;

  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {
    this.router = Router();
    this.router.put('/:id', this.handle.bind(this));
  }

  async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = request.params;
      const user = await this.updateUserUseCase.execute(id, request.body);
      response.status(201).json({
        data: user
      });
    } catch (error) {
      next(error)
    }
  }
}
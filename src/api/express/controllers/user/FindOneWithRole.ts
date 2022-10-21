import { Request, Response, NextFunction, Router } from "express";
import { autoInjectable } from 'tsyringe';
import { FindOneUserWithRoleUseCase } from "../../../../core/user/application/findOneUserWithRole";

@autoInjectable()
export default class FindOneUserWithRoleController {
  public path : string = '/users';
  public router: Router;

  constructor(private readonly findOneUserWithRoleUseCase: FindOneUserWithRoleUseCase) {
    this.router = Router();
    this.router.get('/:id/role', this.handle.bind(this));
  }

  async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = request.params;
      const user = await this.findOneUserWithRoleUseCase.execute(id);
      response.status(200).json({
        data: user
      });
    } catch (error) {
      next(error)
    }
  }
}
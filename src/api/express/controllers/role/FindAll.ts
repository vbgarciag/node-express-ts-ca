import { Request, Response, NextFunction, Router } from "express";
import { autoInjectable } from 'tsyringe';
import { FindAllRolesUseCase } from "../../../../core/role/application/findAllRoles";
import { authenticate } from "../../middleware/passport/authenticate";

@autoInjectable()
export default class FindAllRolesController {
  public path : string = '/roles';
  public router: Router;

  constructor(private readonly findAllRolesUseCase: FindAllRolesUseCase) {
    this.router = Router();
    this.router.get('/', authenticate, this.handle.bind(this));
  }

  async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const roles = await this.findAllRolesUseCase.execute();
      response.status(201).json({
        data: roles
      });
    } catch (error) {
      next(error)
    }
  }
}
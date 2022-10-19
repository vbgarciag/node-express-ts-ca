import { Request, Response, NextFunction, Router } from "express";
import { autoInjectable } from 'tsyringe';
import { FindAllUsersUseCase } from "../../../../../application/usecase/user/findAll";

@autoInjectable()
export default class FindAllUsersController {
  public path : string = '/users';
  public router: Router;

  constructor(private readonly findAllUsersUseCase: FindAllUsersUseCase) {
    this.router = Router();
    this.router.get('/', this.handle.bind(this));
  }

  async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const users = await this.findAllUsersUseCase.execute();
      response.status(201).json(users);
    } catch (error) {
      next(error)
    }
  }
}
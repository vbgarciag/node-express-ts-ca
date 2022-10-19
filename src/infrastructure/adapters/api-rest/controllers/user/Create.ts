import { Request, Response, NextFunction, Router } from "express";
import { CreateUserUseCase } from "../../../../../application/usecase/user/create";
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export default class CreateUserController {
  public path : string = '/users';
  public router: Router;

  constructor(private readonly createUserUseCase: CreateUserUseCase) {
    this.router = Router();
    this.router.post('/', this.handle.bind(this));
  }

  async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { firstName, lastName, email, password } = request.body;

      const user = await this.createUserUseCase.execute({ 
        first_name: firstName, 
        last_name: lastName,
        email, 
        password
      });

      response.status(201).json(user);
    } catch (error) {
      next(error)
    }
  }
}
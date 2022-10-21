import { Request, Response, NextFunction, Router } from "express";
import { autoInjectable } from 'tsyringe';
import { CreateUserUseCase } from "../../../../core/user/application/createUser";
import { z, AnyZodObject, ZodError } from "zod";

const dataSchema: AnyZodObject = z.object({
  body: z.object({
    firstName: z.string({
      required_error: "first_name is required",
    }),
    lastName: z.string({
      required_error: "last_name is required",
    }),
    email: z.string({
        required_error: "Email is required",
    })
      .email("Invalid email"),
    roleId: z.string({
      required_error: "roleId is required"
    })//.uuid("Invalid roleId, uuid expected"),
  }),
});

@autoInjectable()
export default class CreateUserController {
  public path : string = '/users';
  public router: Router;

  constructor(private readonly createUserUseCase: CreateUserUseCase) {
    this.router = Router();
    this.router.post(
      '/', 
      this.validate, 
      this.handle.bind(this)
    );
  }

  public async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { firstName, lastName, email, roleId } = request.body;

      const user = await this.createUserUseCase.execute({ 
        first_name: firstName, 
        last_name: lastName,
        email,
        role_id: roleId
      });

      response.status(201).json({
        data: user
      });
    } catch (error) {
      next(error)
    }
  }

  private async validate(req: Request, res: Response, next: NextFunction) {
    try {
      await dataSchema.parseAsync({
        body: req.body,
      });
      return next();
    } catch (error) {
      const errorObject = error as ZodError;
      return res.status(400).json(errorObject.issues[0]);
    }
  }
}
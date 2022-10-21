import { inject, injectable } from "tsyringe";
import { RoleRepository } from "../domain/roleRepository";

@injectable()
export class FindAllRolesUseCase {
  constructor(
    @inject('RoleRepository') private readonly roleRepository: RoleRepository,
  ) {}

  async execute() {
    return this.roleRepository.findAll();
  }
}
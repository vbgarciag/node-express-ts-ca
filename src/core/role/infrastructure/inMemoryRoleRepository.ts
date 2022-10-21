import { singleton } from "tsyringe";
import { RoleAttributes, RoleCreationAttributes, RoleName } from "../domain/roleEntity";
import { RoleRepository } from "../domain/roleRepository";

@singleton()
export default class InMemoryRoleRepository implements RoleRepository {
  private roles: RoleAttributes[] = [
    {
      id: Math.random().toString(36).substring(7),
      name: RoleName.ADMIN,
      description: 'Administrator of the system',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: Math.random().toString(36).substring(7),
      name: RoleName.USER,
      description: 'User of the system',
      created_at: new Date(),
      updated_at: new Date(),
    }
  ];

  async findByName(name: string): Promise<RoleAttributes | null> {
    return Promise.resolve(this.roles.find((role) => role.name === name) || null);
  }
  async create(input: RoleCreationAttributes) : Promise<RoleAttributes> {
    const role = {
      ...input,
      id: Math.random().toString(36).substring(7),
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.roles.push(role);
    return Promise.resolve(role);
  }
  update(id: string, input: Partial<RoleCreationAttributes>) : Promise<RoleAttributes> {
    const role = this.roles.find((role) => role.id === id);
    if (!role) {
      throw new Error('Role not found');
    }
    const updatedRole = {
      ...role,
      ...input,
      updated_at: new Date(),
    };
    this.roles = this.roles.map((role) => role.id === id ? updatedRole : role);
    return Promise.resolve(updatedRole);
  }
  delete(id: string) : Promise<void> {
    this.roles = this.roles.filter((role) => role.id !== id);
    return Promise.resolve();
  }
  findOne(id: string) : Promise<RoleAttributes | null> {
    return Promise.resolve(this.roles.find((role) => role.id === id) || null);
  }
  findAll() : Promise<RoleAttributes[]> {
    return Promise.resolve(this.roles);
  }
}
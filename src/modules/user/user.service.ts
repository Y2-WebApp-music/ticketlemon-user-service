import { prisma } from "../../lib/db";
import { UserSchema } from "./user.model";

export class UserService {
  async create(data: UserSchema) {
    return prisma.user.create({ data });
  }

  async getAll() {
    return prisma.user.findMany();
  }

  async getById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<UserSchema>) {
    return prisma.user.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.user.delete({ where: { id } });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }
}

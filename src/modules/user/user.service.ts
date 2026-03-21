import { prisma } from "../../lib/db";
import { User } from "./user.model";

export class UserService {
  async createUser(data: User) {
    return prisma.user.create({ data });
  }

  async getAllUsers() {
    return prisma.user.findMany();
  }

  async getUserById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async updateUser(id: string, data: Partial<User>) {
    return prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: string) {
    return prisma.user.delete({ where: { id } });
  }

  async findEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }
}

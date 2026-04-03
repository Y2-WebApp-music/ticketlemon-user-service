import { Elysia, t } from "elysia";
import { UserService } from "./user.service";
import { UserSchema } from "./user.model";
import { HttpStatus } from "../../types/http";

const service = new UserService();

export const userController = new Elysia({ prefix: "/user" })
  .post("/", async ({ body, status }) => {
    try {
      const existingUser = await service.findByEmail(body.email);
      if (existingUser) {
        return status(
          HttpStatus.BAD_REQUEST,
          { message: "Email already exists" }
        );
      }

      const user = await service.create(body);
      return status(HttpStatus.CREATED, user);
    } catch (error) {
      console.error(error);
      return status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }, { body: UserSchema })

  .get("/", async ({ status }) => {
    try {
      const users = await service.getAll();
      return status(HttpStatus.OK, users);
    } catch (error) {
      console.error(error);
      return status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  })

  .get("/:id", async ({ params: { id }, status }) => {
    try {
      const user = await service.getById(id);
      if (!user) {
        return status(
          HttpStatus.NOT_FOUND,
          { message: "User not found" }
        );
      }
      return status(HttpStatus.OK, user);
    } catch (error) {
      console.error(error);
      return status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  })

  .put("/:id", async ({ params: { id }, body, status }) => {
    try {
      const user = await service.getById(id);
      if (!user) {
        return status(
          HttpStatus.NOT_FOUND,
          { message: "User not found" }
        );
      }

      const updatedUser = await service.update(id, body);
      return status(HttpStatus.OK, {
        message: "User updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error(error);
      return status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }, { body: t.Partial(UserSchema) })

  .delete("/:id", async ({ params: { id }, status }) => {
    try {
      const user = await service.getById(id);
      if (!user) {
        return status(
          HttpStatus.NOT_FOUND,
          { message: "User not found" }
        );
      }

      const deletedUser = await service.delete(id);
      return status(HttpStatus.OK, {
        message: "User deleted successfully",
        user: deletedUser,
      });
    } catch (error) {
      console.error(error);
      return status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  })

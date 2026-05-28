import { Elysia, t } from "elysia";
import { UserService } from "./user.service";
import { UserSchema, normalizedUserBody } from "./user.model";
import { HttpStatus } from "../../types/http";
import { uploadFile, deleteFile } from "../../utils/fileManager";

const service = new UserService();

export const userController = new Elysia({ prefix: "/user" })
  .post(
    "/",
    async ({ body, status }) => {
      try {
        const { profile_image, ...rest } = body as Record<string, any>;

        const existingUser = await service.findByEmail(body.email);
        if (existingUser) {
          return status(HttpStatus.BAD_REQUEST, {
            message: "Email already exists",
          });
        }

        const normalizedProfileImage =
          profile_image instanceof File ? await uploadFile(profile_image) : profile_image;

        const payload = normalizedUserBody({
          ...rest,
          profile_image: normalizedProfileImage,
        });

        const user = await service.create(payload);
        return status(HttpStatus.CREATED, user);
      } catch (error) {
        console.error(error);
        return status(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    },
    { body: UserSchema },
  )

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
        return status(HttpStatus.NOT_FOUND, { message: "User not found" });
      }
      return status(HttpStatus.OK, user);
    } catch (error) {
      console.error(error);
      return status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  })

  .patch(
    "/:id",
    async ({ params: { id }, body, status }) => {
      try {
        const user = await service.getById(id);
        if (!user) {
          return status(HttpStatus.NOT_FOUND, { message: "User not found" });
        }

        const { profile_image, ...rest } = body as Record<string, any>;

        let nextProfileImage = profile_image;
        if (profile_image instanceof File) {
          if (user.profile_image) await deleteFile(user.profile_image);
          nextProfileImage = await uploadFile(profile_image);
        }

        const payload = normalizedUserBody({
          ...user,
          ...rest,
          ...(nextProfileImage !== undefined && { profile_image: nextProfileImage }),
        });

        const updatedUser = await service.update(id, payload);
        return status(HttpStatus.OK, {
          message: "User updated successfully",
          user: updatedUser,
        });
      } catch (error) {
        console.error(error);
        return status(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    },
    { body: t.Partial(UserSchema) },
  )

  .delete("/:id", async ({ params: { id }, status }) => {
    try {
      const user = await service.getById(id);
      if (!user) {
        return status(HttpStatus.NOT_FOUND, { message: "User not found" });
      }

      await service.delete(id);
      return status(HttpStatus.OK, { message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      return status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });

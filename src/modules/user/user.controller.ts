import { Elysia, t } from "elysia";
import { UserService } from './user.service';
import { UserSchema } from "./user.model";

const service = new UserService();

export const userController = new Elysia({ prefix: "/user" })
    .post("/", async ({ body }) => {
        try {
            const existingUser = await service.findEmail(body.email);
            if (existingUser) {
                return { message: "Email already exists" };
            }

            const user = await service.createUser(body);
            return user;
        } catch (error) {
            console.error(error);
        }
    }, { body: UserSchema })

    .get("/", async () => {
        try {
            const users = await service.getAllUsers();
            return users;
        } catch (error) {
            console.error(error);
        }
    })

    .get("/:id", async ({ params }) => {
        try {
            const user = await service.getUserById(params.id);
            if (!user) {
                return { message: "User not found" };
            }
            return user;
        } catch (error) {
            console.error(error);
        }
    })

    .put("/:id", async ({ params, body }) => {
        try {
            const updatedUser = await service.updateUser(params.id, body);
            return {
                message: "User updated successfully",
                user: updatedUser,
            };
        } catch (error) {
            console.error(error);
        }
    }, { body: t.Partial(UserSchema) })

    .delete("/:id", async ({ params }) => {
        try {
            const deletedUser = await service.deleteUser(params.id);
            return {
                message: "User deleted successfully",
                user: deletedUser,
            };
        } catch (error) {
            console.error(error);
        }
    })

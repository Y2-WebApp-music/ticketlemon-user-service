import { Elysia } from "elysia";
import { userController } from "./modules/user/user.controller";

const port = Number(process.env.PORT) || 8002;

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(userController)
  .listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

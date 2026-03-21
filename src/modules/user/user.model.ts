import { t } from "elysia";

export const UserSchema = t.Object({
  email: t.String(),
  first_name: t.String(),
  last_name: t.String(),
  phone_number: t.String(),
  birthdate: t.String(),
  gender: t.String(),
  profile_image: t.Optional(t.String()),
});

export type User = typeof UserSchema.static;

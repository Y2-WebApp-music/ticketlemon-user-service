import { t } from "elysia";

export const UserSchema = t.Object({
  email: t.String(),
  first_name: t.String(),
  last_name: t.String(),
  phone_number: t.String(),
  birthdate: t.String(),
  gender: t.String(),
  profile_image: t.Optional(t.Any()),
  org_name: t.Optional(t.String()),
});
export type UserSchema = typeof UserSchema.static;

export const normalizedUserBody = (value: any) => {
  return {
    email: value.email,
    first_name: value.first_name,
    last_name: value.last_name,
    phone_number: value.phone_number,
    birthdate: value.birthdate,
    gender: value.gender,
    profile_image: value.profile_image,
    org_name: value.org_name,
  };
};

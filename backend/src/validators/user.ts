import { z } from "zod";
import { UserRoles } from "../types/user";

export const signupValidator = z.object({
  email: z.string({ required_error: "Email required" }),
  password: z.string({ required_error: "Password required" }),
  role: z.nativeEnum(UserRoles).optional(),
});

export const loginValidator = z.object({
  email: z.string({ required_error: "Email required" }),
  password: z.string({ required_error: "Password required" }),
});

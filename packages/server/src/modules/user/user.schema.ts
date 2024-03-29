import { buildJsonSchemas } from "fastify-zod"
import { z } from "zod"

const USER_ROLE = ["USER", "PRO_USER", "AUTHOR", "ADMIN"] as const

const userCore = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Must be a valid email",
    })
    .min(3)
    .email(),
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .regex(new RegExp(/^[a-zA-Z0-9_]*$/), {
      message:
        "Username should be 3-20 characters without spaces, symbol or any special characters",
    })
    .min(3),
  name: z.string().min(1),
  phoneNumber: z
    .string({ invalid_type_error: "Phone Number must be a string" })
    .optional(),
  profilePictureId: z
    .string({ invalid_type_error: "Profile Picture must be a string" })
    .optional(),
  about: z.string({ invalid_type_error: "About must be a string" }).optional(),
  metaTitle: z
    .string({
      invalid_type_error: "Meta Title must be a string",
    })
    .optional(),
  metaDescription: z
    .string({
      invalid_type_error: "Meta Description must be a string",
    })
    .optional(),
}

const createUserSchema = z.object({
  ...userCore,
  role: z
    .enum(USER_ROLE, {
      invalid_type_error: "only USER, AUTHOR, and ADMIN are accepted",
    })
    .optional(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    //FIX: custom error message not work on password validation
    .regex(
      new RegExp(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,64}$/,
      ),
      {
        message:
          "Password should be 8-64 characters and include at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character!",
      },
    ),
})

const updateUserSchema = z.object({
  ...userCore,
  role: z
    .enum(USER_ROLE, {
      invalid_type_error: "only USER, AUTHOR, and ADMIN are accepted",
    })
    .optional(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    //FIX: custom error message not work on password validation
    .regex(
      new RegExp(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,64}$/,
      ),
      {
        message:
          "Password should be 8-64 characters and include at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character!",
      },
    )
    .optional(),
})

const userResponseSchema = z.object({
  id: z.string(),
  profilePicture: z
    .object({
      id: z.string().optional(),
      url: z.string().optional(),
    })
    .optional(),
  ...userCore,
})

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string(),
})

const loginResponseSchema = z.object({
  accessToken: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    username: z.string(),
    name: z.string(),
    role: z.string(),
    phoneNumber: z.string().optional(),
    profilePicture: z
      .object({
        id: z.string().optional(),
        url: z.string().optional(),
      })
      .optional(),
    about: z.string().optional(),
  }),
})

export type CreateUserInput = z.infer<typeof createUserSchema>

export type UpdateUserInput = z.infer<typeof updateUserSchema>

export type LoginInput = z.infer<typeof loginSchema>

const models = {
  createUserSchema,
  userResponseSchema,
  updateUserSchema,
  loginSchema,
  loginResponseSchema,
}

export const { schemas: userSchemas, $ref } = buildJsonSchemas(models, {
  $id: "UserSchema",
})

import { buildJsonSchemas } from "fastify-zod"
import { z } from "zod"

const wpCommentInput = {
  wpPostSlug: z.string({
    required_error: "WP Post Slug is required",
    invalid_type_error: "WP Post Slug must be a string",
  }),
  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    })
    .min(1),
}

const wpCommentUpdateInput = {
  content: z.string({
    required_error: "Content is required",
    invalid_type_error: "Content must be a string",
  }),
}

const wpCommentGenerated = {
  id: z.string(),
  wpPostSlug: z.string(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
}

const createWpCommentSchema = z.object({
  ...wpCommentInput,
})

const updateWpCommentSchema = z.object({
  ...wpCommentUpdateInput,
})

const wpCommentResponseSchema = z.object({
  ...wpCommentInput,
  ...wpCommentGenerated,
})

const wpCommentsResponseSchema = z.array(wpCommentResponseSchema)

export type CreateWpCommentInput = z.infer<typeof createWpCommentSchema>
export type UpdateWpCommentInput = z.infer<typeof updateWpCommentSchema>

const models = {
  wpCommentResponseSchema,
  wpCommentsResponseSchema,
  createWpCommentSchema,
  updateWpCommentSchema,
}

export const { schemas: wpCommentSchemas, $ref } = buildJsonSchemas(models, {
  $id: "WpCommentSchema",
})

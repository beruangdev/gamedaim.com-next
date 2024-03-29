import { FastifyInstance } from "fastify"

import {
  deleteMediaByIdHandler,
  deleteMediaByNameHandler,
  getMediaByAuthorIdHandler,
  getMediaByIdHandler,
  getMediasHandler,
  getTotalMediasHandler,
  searchMediasHandler,
  updateMediaHandler,
  uploadMediaHandler,
  uploadMultipleMediaHandler,
} from "./media.controller"
import { $ref } from "./media.schema"

async function mediaRoutes(server: FastifyInstance) {
  //TODO: handling upload schema
  server.post(
    "/image",
    {
      preHandler: [server.authenticate],
    },
    uploadMediaHandler,
  )

  server.post(
    "/images",
    {
      preHandler: [server.authenticate],
    },
    uploadMultipleMediaHandler,
  )

  server.get(
    "/page/:mediaPage",
    {
      schema: {
        response: {
          200: $ref("mediasResponseSchema"),
        },
      },
    },

    getMediasHandler,
  )

  server.get(
    "/dashboard/page/:mediaPage",
    {
      schema: {
        response: {
          200: $ref("mediasResponseSchema"),
        },
      },
    },

    getMediasHandler,
  )

  server.get(
    "/search/:searchMediaQuery",
    {
      schema: {
        response: {
          200: $ref("mediasResponseSchema"),
        },
      },
    },

    searchMediasHandler,
  )

  server.get(
    "/:mediaId",
    {
      schema: {
        response: {
          200: $ref("mediasResponseSchema"),
        },
      },
    },
    getMediaByIdHandler,
  )

  server.get(
    "/author/:authorId/:mediaPage",
    {
      schema: {
        response: {
          200: $ref("mediasResponseSchema"),
        },
      },
    },
    getMediaByAuthorIdHandler,
  )

  server.put(
    "/:mediaId",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("updateMediaSchema"),
        response: {
          201: $ref("mediaResponseSchema"),
        },
      },
    },
    updateMediaHandler,
  )

  server.delete(
    "/:mediaId",
    { preHandler: [server.authenticate] },
    deleteMediaByIdHandler,
  )

  server.delete(
    "/name/:mediaName",
    { preHandler: [server.authenticate] },
    deleteMediaByNameHandler,
  )

  server.get(
    "/count",
    { preHandler: [server.authenticate] },
    getTotalMediasHandler,
  )
}

export default mediaRoutes

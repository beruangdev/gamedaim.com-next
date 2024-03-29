import fastify, { FastifyReply, FastifyRequest } from "fastify"
import cors from "@fastify/cors"
import jwt from "@fastify/jwt"
import multipart from "@fastify/multipart"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import { withRefResolver } from "fastify-zod"

import env from "env"
import { LoggerOption, loggerOption } from "@/utils/logger"
import { version } from "package.json"
import adRoutes from "@/modules/ad/ad.route"
import { adSchemas } from "@/modules/ad/ad.schema"
import articleRoutes from "@/modules/article/article.route"
import { articleSchemas } from "@/modules/article/article.schema"
import articleCommentRoutes from "@/modules/article-comment/article-comment.route"
import { articleCommentSchemas } from "@/modules/article-comment/article-comment.schema"
import downloadRoutes from "@/modules/download/download.route"
import { downloadSchemas } from "@/modules/download/download.schema"
import downloadCommentRoutes from "@/modules/download-comment/download-comment.route"
import { downloadCommentSchemas } from "@/modules/download-comment/download-comment.schema"
import downloadFileRoutes from "@/modules/download-file/download-file.route"
import { downloadFileSchemas } from "@/modules/download-file/download-file.schema"
import mediaRoutes from "@/modules/media/media.route"
import { mediaSchemas } from "@/modules/media/media.schema"
import menuRoutes from "@/modules/menu/menu.route"
import { menuSchemas } from "@/modules/menu/menu.schema"
import paymentRoutes from "@/modules/payment/payment.route"
import { paymentSchemas } from "@/modules/payment/payment.schema"
import settingRoutes from "@/modules/setting/setting.route"
import { settingSchemas } from "@/modules/setting/setting.schema"
import topicRoutes from "@/modules/topic/topic.route"
import { topicSchemas } from "@/modules/topic/topic.schema"
import transactionCounterRoutes from "@/modules/transaction-counter/transaction-counter.route"
import { transactionCounterSchemas } from "@/modules/transaction-counter/transaction-counter.schema"
import topUpRoutes from "@/modules/top-up/top-up.route"
import { topUpSchemas } from "@/modules/top-up/top-up.schema"
import topUpReviewRoutes from "@/modules/top-up-review/top-up-review.route"
import { topUpReviewSchemas } from "@/modules/top-up-review/top-up-review.schema"
import topUpTransactionRoutes from "@/modules/top-up-transaction/top-up-transaction.route"
import { topUpTransactionSchemas } from "@/modules/top-up-transaction/top-up-transaction.schema"
import userRoutes from "@/modules/user/user.route"
import { userSchemas } from "@/modules/user/user.schema"
import voucherRoutes from "@/modules/voucher/voucher.route"
import { voucherSchemas } from "@/modules/voucher/voucher.schema"
import viewCounterRoutes from "@/modules/view-counter/view-counter.route"
import { viewCounterSchemas } from "@/modules/view-counter/view-counter.schema"
import wpCommentRoutes from "@/modules/wp-comment/wp-comment.route"
import { wpCommentSchemas } from "@/modules/wp-comment/wp-comment.schema"

function buildServer() {
  const server = fastify({
    logger: loggerOption[env.NODE_ENV as keyof LoggerOption] ?? true,
  })

  // const allowedOrigins = (env.ORIGIN?.split(",") ?? []).map((origin) => {
  //   if (origin.startsWith("https://")) {
  //     return origin
  //   } else {
  //     return `https://${origin}`
  //   }
  // })

  server.register(cors, {
    // origin: env.NODE_ENV === "production" ? allowedOrigins : true,
    origin: true,
    credentials: true,
  })

  server.register(jwt, {
    secret: env.JWT_SECRET,
  })

  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify()
      } catch (e) {
        return reply.send(e)
      }
    },
  )

  server.register(multipart, {
    limits: {
      fieldNameSize: 100,
      fieldSize: 100,
      fields: 10,
      fileSize: 1000000 * 20,
      files: 20,
      headerPairs: 2000,
    },
  })

  server.get("/health-check", async () => {
    return { status: "OK" }
  })

  server.addHook("preHandler", (req, _reply, next) => {
    req.jwt = server.jwt
    return next()
  })

  for (const schema of [
    ...adSchemas,
    ...articleSchemas,
    ...articleCommentSchemas,
    ...downloadSchemas,
    ...downloadCommentSchemas,
    ...downloadFileSchemas,
    ...mediaSchemas,
    ...menuSchemas,
    ...paymentSchemas,
    ...settingSchemas,
    ...topicSchemas,
    ...topUpSchemas,
    ...topUpReviewSchemas,
    ...topUpTransactionSchemas,
    ...transactionCounterSchemas,
    ...userSchemas,
    ...voucherSchemas,
    ...viewCounterSchemas,
    ...wpCommentSchemas,
  ]) {
    server.addSchema(schema)
  }

  server.register(
    fastifySwagger,
    withRefResolver({
      openapi: {
        info: {
          title: "Gamedaim API",
          description: "Gamedaim API",
          version,
        },
      },
    }),
  )

  server.register(fastifySwaggerUi, {
    routePrefix: "/docs",
  })

  server.register(adRoutes, { prefix: "api/ad" })
  server.register(articleRoutes, { prefix: "api/article" })
  server.register(articleCommentRoutes, { prefix: "api/article-comment" })
  server.register(downloadRoutes, { prefix: "api/download" })
  server.register(downloadCommentRoutes, { prefix: "api/download-comment" })
  server.register(downloadFileRoutes, { prefix: "api/download-file" })
  server.register(mediaRoutes, { prefix: "api/media" })
  server.register(menuRoutes, { prefix: "api/menu" })
  server.register(paymentRoutes, { prefix: "api/payment" })
  server.register(settingRoutes, { prefix: "api/setting" })
  server.register(userRoutes, { prefix: "api/user" })
  server.register(topicRoutes, { prefix: "api/topic" })
  server.register(topUpRoutes, { prefix: "api/top-up" })
  server.register(topUpReviewRoutes, { prefix: "api/top-up-review" })
  server.register(topUpTransactionRoutes, { prefix: "api/top-up-transaction" })
  server.register(transactionCounterRoutes, {
    prefix: "api/transaction-counter",
  })
  server.register(voucherRoutes, { prefix: "api/voucher" })
  server.register(viewCounterRoutes, { prefix: "api/view-counter" })
  server.register(wpCommentRoutes, { prefix: "api/wp-comment" })

  return server
}

export default buildServer

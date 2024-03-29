import { FastifyReply, FastifyRequest } from "fastify"
import { AdPosition } from "@prisma/client"

import { CreateAdInput, UpdateAdInput } from "./ad.schema"
import {
  createAd,
  deleteAdById,
  getAdById,
  getAds,
  getAdsByPosition,
  getTotalAds,
  updateAd,
} from "./ad.service"

export async function createAdHandler(
  request: FastifyRequest<{
    Body: CreateAdInput
  }>,
  reply: FastifyReply,
) {
  try {
    const { title, content, position, type, active } = request.body
    const user = request.user

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const ad = await createAd({
      title,
      content,
      position,
      type,
      active,
    })
    return reply.code(201).send(ad)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function updateAdHandler(
  request: FastifyRequest<{
    Params: { adId: string }
    Body: UpdateAdInput
  }>,
  reply: FastifyReply,
) {
  try {
    const { title, content, position, type, active } = request.body
    const user = request.user
    const adId = request.params.adId

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const ad = await updateAd(adId, {
      title,
      content,
      position,
      type,
      active,
    })
    return reply.code(201).send(ad)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function deleteAdHandler(
  request: FastifyRequest<{ Params: { adId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { adId } = request.params
    const user = request.user
    const deleteAd = await deleteAdById(adId)

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    return reply.code(201).send(deleteAd)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getAdsHandler(
  request: FastifyRequest<{ Params: { adPage: number } }>,
  reply: FastifyReply,
) {
  try {
    const perPage = 10
    const adPage = Number(request.params.adPage || 1)
    const ads = await getAds(adPage, perPage)
    return reply.code(201).send(ads)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getAdsByPositionHandler(
  request: FastifyRequest<{
    Params: { adPosition: AdPosition }
  }>,
  reply: FastifyReply,
) {
  try {
    const { adPosition } = request.params
    const ad = await getAdsByPosition(adPosition)
    return reply.code(201).send(ad)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getAdByIdHandler(
  request: FastifyRequest<{
    Params: { adId: string }
  }>,
  reply: FastifyReply,
) {
  try {
    const { adId } = request.params
    const ad = await getAdById(adId)
    return reply.code(201).send(ad)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

export async function getTotalAdsHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const user = request.user

    if (user.role !== "ADMIN") {
      return reply.code(403).send({ message: "Unauthorized" })
    }

    const ads = await getTotalAds()
    return reply.code(201).send(ads)
  } catch (e) {
    console.log(e)
    return reply.code(500).send(e)
  }
}

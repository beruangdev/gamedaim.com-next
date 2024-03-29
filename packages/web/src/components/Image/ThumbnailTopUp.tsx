"use client"

import * as React from "react"
import { Image } from "@/components/Image"
import { Icon } from "@/components/UI/Icon"

import { getSettingByKeyAction } from "@/lib/api/server/setting"

interface ThumbnailTopUpProps {
  url: string
  className: string
}

export const ThumbnailTopUp = (props: ThumbnailTopUpProps) => {
  const { url, className } = props
  const [thumbnailTopUpUrl, setThumbnailTopUpUrl] = React.useState("")
  const [loading, setLoading] = React.useState(true)
  const [imageError, setImageError] = React.useState(false)

  React.useEffect(() => {
    const getThumbnailTopUp = async () => {
      const { data } = await getSettingByKeyAction(`${url}-image`)
      if (data) {
        const parsedData = JSON.parse(data.value)
        setThumbnailTopUpUrl(parsedData.thumbnailImage)
      }
      setLoading(false)
    }
    getThumbnailTopUp()
  }, [url])
  return (
    <>
      <div className={className}>
        {loading ? (
          <div className="loading-image h-full w-full" />
        ) : !thumbnailTopUpUrl || imageError ? (
          <Icon.BrokenImage className={className} />
        ) : (
          <Image
            src={thumbnailTopUpUrl}
            alt={url}
            className="loading-image cursor-pointer rounded-sm object-cover"
            onLoadingComplete={(e) => {
              e.classList.remove("loading-image")
            }}
            onError={() => setImageError(true)}
            fill
            sizes="(max-width: 768px) 30vw,
  (max-width: 1200px) 20vw,
  33vw"
            quality={60}
          />
        )}
      </div>
    </>
  )
}

"use client"

import * as React from "react"

import { getSettingByKeyAction } from "@/lib/api/server/setting"
import { Icon } from "@/components/UI/Icon"
import { Image } from "@/components/Image"

interface CoverTopUpProps {
  url: string
  className: string
}
export const CoverTopUp = (props: CoverTopUpProps) => {
  const { url, className } = props
  const [coverTopUpUrl, setCoverTopUpUrl] = React.useState("")
  const [loading, setLoading] = React.useState(true)
  const [imageError, setImageError] = React.useState(false)

  React.useEffect(() => {
    const getCoverTopUp = async () => {
      const { data } = await getSettingByKeyAction(`${url}-image`)
      if (data) {
        const parsedData = JSON.parse(data.value)
        setCoverTopUpUrl(parsedData.coverImage)
      }
      setLoading(false)
    }
    getCoverTopUp()
  }, [url])
  return (
    <>
      <div className={className}>
        {loading ? (
          <div className="loading-image h-full w-full" />
        ) : !coverTopUpUrl || imageError ? (
          <Icon.BrokenImage className={className} />
        ) : (
          <Image
            src={coverTopUpUrl}
            alt={url}
            className="loading-image cursor-pointer rounded-sm object-cover"
            onLoadingComplete={(e) => {
              e.classList.remove("loading-image")
            }}
            onError={() => setImageError(true)}
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

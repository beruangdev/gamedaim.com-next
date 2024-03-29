import * as React from "react"

import { Icon } from "@/components/UI/Icon"
import { ShareButton, ShareButtonProps } from "./ShareButton"

export const ShareButtonReddit = React.forwardRef<
  HTMLDivElement,
  ShareButtonProps
>((props, ref) => {
  const { url, onClick, text, ...rest } = props

  return (
    <ShareButton
      className="bg-[#ff4500]"
      onClick={onClick}
      icon={<Icon.Reddit aria-label="Telegram" />}
      text={text || "Reddit"}
      url={`https://reddit.com/submit/?url=${encodeURI(url as string)}`}
      ref={ref}
      {...rest}
    />
  )
})

"use client"

import * as React from "react"
import NextImage from "next/image"
import NextLink from "next/link"
import useSWR from "swr"
import env from "env"

import { UserMenu } from "@/components/Menu"
import { SearchWP } from "@/components/Search"
import { IconButton } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { ThemeSwitcher } from "@/components/Theme"

import { getSettingByKeyAction } from "@/lib/api/server/setting"

interface TopNavProps {
  toggleSideNav?: () => void
}

export const TopNav = React.forwardRef<HTMLDivElement, TopNavProps>(
  (props: TopNavProps, ref) => {
    const { toggleSideNav, ...rest } = props

    const { data: facebook } = useSWR("facebookUsername", (key) =>
      getSettingByKeyAction(key),
    )

    const { data: twitter } = useSWR("twitterUsername", (key) =>
      getSettingByKeyAction(key),
    )

    const { data: instagram } = useSWR("instagramUsername", (key) =>
      getSettingByKeyAction(key),
    )

    const { data: youtube } = useSWR("youtubeUsername", (key) =>
      getSettingByKeyAction(key),
    )

    return (
      <header
        className="bg-background fixed left-auto top-0 z-[49] -my-0 mx-auto box-border flex h-16 w-full items-center border-none px-2 py-0 align-baseline shadow-lg outline-none"
        ref={ref}
        {...rest}
      >
        <div className="relative ml-auto mr-auto grow px-3">
          <div className="h-full">
            <div className="-ml-4 -mr-4 flex h-full flex-row flex-nowrap items-center">
              <div className="flex w-[250px]">
                <div className="ml-1 mr-2">
                  <IconButton
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer text-xl"
                    onClick={toggleSideNav}
                  >
                    <Icon.Menu />
                  </IconButton>
                </div>
                <div className="ak-bar-item ak-header-logo flex w-full flex-row flex-wrap items-center justify-start pl-0 pr-0">
                  <h2 className="m-0 p-0 text-4xl font-bold leading-none">
                    <NextLink aria-label="Go To Homepage" href="/">
                      <div className="relative h-[23px] w-[120px]">
                        <NextImage
                          fill
                          sizes="(max-width: 768px) 30vw,
                      (max-width: 1200px) 20vw,
                      33vw"
                          alt={env.SITE_TITLE}
                          src={env.LOGO_URL}
                          quality={60}
                        />
                      </div>
                    </NextLink>
                  </h2>
                </div>
              </div>
              <div className="relative max-md:ml-auto md:ml-3 md:mr-auto lg:w-[40%] xl:w-[50%]">
                <SearchWP />
              </div>
              <div className="grow-1 flex flex-row space-x-2">
                <div className="hidden space-x-2 lg:block">
                  {facebook && facebook?.data?.value && (
                    <NextLink
                      aria-label="Facebook"
                      href={`https://www.facebook.com/${facebook?.data?.value}`}
                      target="_blank"
                    >
                      <IconButton aria-label="Facebook" variant="ghost">
                        <Icon.Facebook
                          className="h-5 w-5"
                          aria-label="Facebook"
                        />
                      </IconButton>
                    </NextLink>
                  )}
                  {twitter && twitter?.data?.value && (
                    <NextLink
                      aria-label="Twitter"
                      href={`https://www.twitter.com/${twitter?.data?.value}`}
                      target="_blank"
                    >
                      <IconButton aria-label="Twitter" variant="ghost">
                        <Icon.Twitter
                          className="h-5 w-5"
                          aria-label="Twitter"
                        />
                      </IconButton>
                    </NextLink>
                  )}
                  {youtube && youtube?.data?.value && (
                    <NextLink
                      aria-label="Youtube"
                      href={`https://www.youtube.com/channel/${youtube?.data?.value}`}
                      target="_blank"
                    >
                      <IconButton aria-label="Youtube" variant="ghost">
                        <Icon.Youtube
                          className="h-5 w-5"
                          aria-label="Youtube"
                        />
                      </IconButton>
                    </NextLink>
                  )}
                  {instagram && instagram?.data?.value && (
                    <NextLink
                      aria-label="Instagram"
                      href={`https://www.instagram.com/${instagram?.data?.value}`}
                      target="_blank"
                    >
                      <IconButton aria-label="Instagram" variant="ghost">
                        <Icon.Instagram
                          className="h-5 w-5"
                          aria-label="Instagram"
                        />
                      </IconButton>
                    </NextLink>
                  )}
                </div>
                <div className="flex space-x-2">
                  <ThemeSwitcher />
                </div>
                <div>
                  <UserMenu />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  },
)

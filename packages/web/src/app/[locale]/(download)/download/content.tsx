import * as React from "react"
import NextLink from "next/link"

import { DropdownLink } from "@/components/Dropdown"
import { SearchDownload } from "@/components/Search"
import { ListDownload } from "@/components/List"
import { DownloadCard } from "@/components/Card"
import { Ad } from "@/components/Ad"

import {
  AdDataProps,
  DownloadDataProps,
  TopicDataProps,
} from "@/lib/data-types"

interface DownloadProps {
  downloads: DownloadDataProps[] | null
  apps: DownloadDataProps[] | null
  games: DownloadDataProps[] | null
  topics: TopicDataProps[] | null
  adsBelowHeader: AdDataProps[] | null
}

export function DownloadPageContent(props: DownloadProps) {
  const { downloads, apps, games, topics, adsBelowHeader } = props

  return (
    <>
      {adsBelowHeader &&
        adsBelowHeader.length > 0 &&
        adsBelowHeader.map((ad: AdDataProps) => {
          return <Ad ad={ad} />
        })}
      <div className="mx-auto flex w-full flex-col max-[991px]:px-4 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
        <div className="bg-muted/10 flex flex-col rounded-md p-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex space-x-2">
              <DropdownLink list={topics} title={"Category"} />
            </div>
            <div>
              <SearchDownload />
            </div>
          </div>
        </div>

        <div className="w-full px-4">
          <div className={"my-2 flex flex-row justify-between"}>
            <h2>Games</h2>
            <NextLink aria-label="See More Download" href="/download/game/">
              <p className="text-primary/50">See more</p>
            </NextLink>
          </div>
          <ListDownload listDownloads={games} />
        </div>
        <div className="w-full px-4">
          <div className={"my-2 flex flex-row justify-between"}>
            <h2>Apps</h2>
            <NextLink aria-label="See More Download" href="/download/app/">
              <p className="text-primary/50">See more</p>
            </NextLink>
          </div>
          <ListDownload listDownloads={apps} />
        </div>
        <div className="w-full px-4">
          <div className={"my-2 flex flex-row justify-start"}>
            <h2>Newest</h2>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {downloads &&
              downloads.map((download) => {
                return (
                  <DownloadCard
                    operatingSystem={download.operatingSystem}
                    slug={download.slug}
                    title={download.title}
                    featuredImage={download.featuredImage}
                    type={download.type || "app"}
                    downloadFiles={download.downloadFiles}
                  />
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

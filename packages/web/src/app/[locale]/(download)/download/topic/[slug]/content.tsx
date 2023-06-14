import * as React from "react"

import { TopicDataProps } from "@/lib/data-types"
import { InfiniteScrollDownloadByTopic } from "@/components/InfiniteScroll"

interface TopicProps {
  topicDownload: TopicDataProps | null
}

export function DownloadsByTopicContent(props: TopicProps) {
  const { topicDownload } = props
  const totalPage =
    topicDownload &&
    topicDownload._count.download &&
    Math.ceil(topicDownload._count.download / 10)

  return (
    <div className="mx-auto flex w-full flex-col max-[991px]:px-4 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
      <div className="w-full px-4">
        <div className={"my-2 flex flex-row justify-start"}>
          <h2>Newest</h2>
        </div>
        {topicDownload && topicDownload.downloads && (
          <InfiniteScrollDownloadByTopic
            slug={topicDownload.slug}
            id={topicDownload.slug}
            posts={topicDownload.downloads}
            index={2}
            totalPage={totalPage || 1}
          />
        )}
      </div>
    </div>
  )
}

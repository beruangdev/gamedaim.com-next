import useSWR from "swr"
import { fetcher, http } from "@/lib/http"
import { AxiosError } from "axios"
import { toast } from "@/components/UI/Toast"

import {
  WpCommentDataProps,
  CommentDataProps,
  ErrorResponse,
} from "@/lib/data-types"
type WpCommentDataWithoutAuthor = Omit<WpCommentDataProps, "author">
type CommentDataOrWpCommentDataWithoutAuthor =
  | CommentDataProps
  | WpCommentDataWithoutAuthor

export const FetchArticleComment = ({
  addComment,
  setTotalComments,
  page,
  totalComments,
}: {
  addComment: (item: CommentDataOrWpCommentDataWithoutAuthor[]) => void
  setTotalComments: (item: number) => void
  page: number
  totalComments: number
}): {
  data: CommentDataOrWpCommentDataWithoutAuthor[]
  count: number
  lastPage: number
} => {
  const { data } = useSWR(`/article-comment/page/${page}`, fetcher, {
    onSuccess: (data) => {
      addComment(data)
    },
    onError: (error) => {
      toast({
        variant: "danger",
        description: error.message,
      })
    },
  })

  const { data: count } = useSWR(`/article-comment/count`, fetcher, {
    onSuccess: (data) => {
      setTotalComments(data)
    },
    onError: (error) => {
      toast({
        variant: "danger",
        description: error.message,
      })
    },
  })
  const lastPage = count && Math.ceil(totalComments / 10)

  return { data, count, lastPage }
}

export const deleteArticleComment = async ({
  commentId,
}: {
  commentId: string
}) => {
  try {
    const [res, err] = await http<CommentDataOrWpCommentDataWithoutAuthor>(
      "DELETE",
      {
        url: `/article-comment/${commentId}`,
      },
    )

    if (err !== null) {
      toast({
        variant: "danger",
        description: (err as AxiosError<ErrorResponse>)?.response?.data
          ?.message as string,
      })
      console.error(err)
    } else if (res) {
      toast({
        variant: "success",
        description: "Komentar berhasil dihapus",
      })
    }
    return res
  } catch (error) {
    console.error(error)
  }
}

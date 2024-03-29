"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"

import { Image } from "@/components/Image"
import { ModalSelectMedia } from "@/components/Modal"
import { Button } from "@/components/UI/Button"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  RequiredIndicator,
} from "@/components/UI/Form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select"
import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast"
import {
  getTopicByIdAction,
  getTopicPrimaryByIdAction,
  putTopicAction,
} from "@/lib/api/server/topic"
import { LanguageTypeData, TopicTypeData } from "@/lib/data-types"

interface FormValues {
  title: string
  slug: string
  description?: string
  metaTitle?: string
  metaDescription?: string
  language: LanguageTypeData
  type: TopicTypeData
  primaryId: string
}

export const EditTopicForm = (props: { id: string }) => {
  const { id } = props
  const [loading, setLoading] = React.useState<boolean>(false)
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const [selectFeaturedImageId, setSelectFeaturedImageId] =
    React.useState<string>("")
  const [selectedFeaturedImageUrl, setSelectedFeaturedImageUrl] =
    React.useState<string>("")
  const [topic, setTopic] = React.useState<FormValues & { id: string }>({
    id: "",
    title: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",
    language: "id",
    type: "ALL",
    primaryId: "",
  })

  const router = useRouter()

  const loadTopic = React.useCallback(async () => {
    const { data, error } = await getTopicByIdAction(id as string)
    if (data) {
      setTopic({
        id: data.id,
        title: data.title,
        slug: data.slug,
        description: data.description,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        language: data.language,
        type: data.type,
        primaryId: data.topicPrimary.id,
      })
      setSelectFeaturedImageId(data.featuredImage?.id as string)
      setSelectedFeaturedImageUrl(data.featuredImage?.url as string)
    } else {
      toast({ variant: "danger", description: error })
    }
  }, [id])

  const handleUpdateMedia = (data: {
    id: React.SetStateAction<string>
    url: React.SetStateAction<string>
  }) => {
    setSelectFeaturedImageId(data.id as string)
    setSelectedFeaturedImageUrl(data.url as string)
    setOpenModal(false)
  }

  const {
    register,
    formState: { errors },
    reset,
    control,
    handleSubmit,
  } = useForm<FormValues>()

  React.useEffect(() => {
    loadTopic()
  }, [loadTopic])

  React.useEffect(() => {
    reset(topic)
  }, [reset, topic])

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    const mergedValues = {
      ...values,
      featuredImageId: selectFeaturedImageId,
    }
    const { data: primaryData } = await getTopicPrimaryByIdAction(
      values.primaryId,
    )
    const otherLangTopic = primaryData?.topics.find(
      (topicData) => topicData.id !== topic.id,
    )
    if (otherLangTopic?.language !== values.language) {
      const { data } = await putTopicAction(topic.id, mergedValues)
      if (data) {
        toast({
          variant: "success",
          description: "Topic successfully Edited ",
        })
        router.push("/dashboard/topic")
      }
    } else {
      toast({
        variant: "danger",
        description: "Topic with same language has been added ",
      })
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormControl invalid={Boolean(errors.title)}>
        <FormLabel>
          Title
          <RequiredIndicator />
        </FormLabel>
        <Input
          type="text"
          {...register("title", {
            required: "Title is Required",
          })}
          className="max-w-xl"
          placeholder="Enter Title"
        />
        {errors?.title && (
          <FormErrorMessage>{errors.title.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl invalid={Boolean(errors.slug)}>
        <FormLabel>
          Slug
          <RequiredIndicator />
        </FormLabel>
        <Input
          type="text"
          {...register("slug", {
            required: "Slug is Required",
          })}
          className="max-w-xl"
          placeholder="Enter Slug"
        />
        {errors?.slug && (
          <FormErrorMessage>{errors.slug.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl>
        <FormLabel>
          Language
          <RequiredIndicator />
        </FormLabel>
        <Controller
          control={control}
          name="language"
          render={({ field }) => (
            <Select
              defaultValue={field.value}
              value={field.value}
              onValueChange={(value: LanguageTypeData) => field.onChange(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                  <SelectItem value={topic.language}>
                    {topic.language === "id"
                      ? "Indonesia"
                      : topic.language === "en" && "English"}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors?.language && (
          <FormErrorMessage>{errors.language.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl>
        <FormLabel>
          Type
          <RequiredIndicator />
        </FormLabel>
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <Select
              defaultValue={field.value}
              value={field.value}
              onValueChange={(value: TopicTypeData) => field.onChange(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  <SelectItem value="ALL">ALL</SelectItem>
                  <SelectItem value="ARTICLE">ARTICLE</SelectItem>
                  <SelectItem value="DOWNLOAD">DOWNLOAD</SelectItem>
                  <SelectItem value="REVIEW">REVIEW</SelectItem>
                  <SelectItem value="TUTORIAL">TUTORIAL</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors?.type && (
          <FormErrorMessage>{errors.type.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl invalid={Boolean(errors.description)}>
        <FormLabel>Description</FormLabel>
        <Textarea
          {...register("description")}
          className="max-w-xl"
          placeholder="Enter Description (Optional)"
        />
        {errors?.description && (
          <FormErrorMessage>{errors.description.message}</FormErrorMessage>
        )}
      </FormControl>
      {selectedFeaturedImageUrl ? (
        <>
          <FormLabel>Featured Image</FormLabel>
          <ModalSelectMedia
            handleSelectUpdateMedia={handleUpdateMedia}
            open={openModal}
            setOpen={setOpenModal}
            triggerContent={
              <div className="border-muted/30 relative mt-2 aspect-video h-[150px] cursor-pointer rounded-sm border-2">
                <Image
                  src={selectedFeaturedImageUrl}
                  className="object-cover"
                  fill
                  alt="Featured Image"
                  onClick={() => setOpenModal(true)}
                  sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 33vw"
                />
              </div>
            }
          />
        </>
      ) : (
        <ModalSelectMedia
          handleSelectUpdateMedia={handleUpdateMedia}
          open={openModal}
          setOpen={setOpenModal}
          triggerContent={
            <>
              <FormLabel>Featured Image</FormLabel>
              <div
                onClick={() => setOpenModal(true)}
                className="bg-muted text-success relative mr-auto flex aspect-video h-[150px] items-center justify-center"
              >
                <p>Select Featured Image</p>
              </div>
            </>
          }
        />
      )}
      <FormControl invalid={Boolean(errors.metaTitle)}>
        <FormLabel>Meta Title</FormLabel>
        <Input
          type="text"
          {...register("metaTitle")}
          className="max-w-xl"
          placeholder="Enter Meta Title (Optional)"
        />
        {errors?.metaTitle && (
          <FormErrorMessage>{errors.metaTitle.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl invalid={Boolean(errors.metaDescription)}>
        <FormLabel>Meta Description</FormLabel>
        <Textarea
          {...register("metaDescription")}
          className="max-w-xl"
          placeholder="Enter Meta Description (Optional)"
        />
        {errors?.metaDescription && (
          <FormErrorMessage>{errors.metaDescription.message}</FormErrorMessage>
        )}
      </FormControl>
      <Button aria-label="Submit" type="submit" loading={loading}>
        Submit
      </Button>
    </form>
  )
}

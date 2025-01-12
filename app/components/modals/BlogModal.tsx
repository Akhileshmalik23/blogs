'use client'
import useBlogModal from "@/app/hooks/useBlogModal"
import Modal from "./Modal"
import Heading from "../Heading"
import { FieldValue, SubmitHandler, useForm } from "react-hook-form"
import ImageUpload from "../inputs/ImageUpload"
import Input from "../inputs/Input"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

// Define the shape of your form data
type RentFormData = {
  imageSrc: string;
  title: string;
  description: string;
  category: string;
}

const BlogModal = () => {
  const blogModal = useBlogModal()
const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<RentFormData>({
    defaultValues: {
      imageSrc: "",
      title: "",
      description: "",
      category: "",
    }
  })

  const imageSrc = watch("imageSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const onSubmit: SubmitHandler<RentFormData> = (data) => {
    console.log(data)
    axios.post('/api/blogs', data)
      .then(() => {
        toast.success("blog created succesfully !");
        blogModal.onClose()
        router.refresh()
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
  }

  const bodyContent = (
    <>
      <Input
        id="title"
        label="Title"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="category"
        label="Category"
        register={register}
        errors={errors}
        required
      />

      <Input
        id="description"
        label="Description"
        register={register}
        errors={errors}
        required
      />
      <div className="flex flex-col gap-8">
        <ImageUpload onChange={(value) => setCustomValue("imageSrc", value)} value={imageSrc} />
      </div>
    </>
  );

  return (
    <Modal
      isOpen={blogModal.isOpen}
      title="Create Blog"
      actionLabel='Create'
      onSubmit={handleSubmit(onSubmit)}
      onClose={blogModal.onClose}
      body={bodyContent}
    />
  )
}

export default BlogModal

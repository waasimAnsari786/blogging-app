import React, { useCallback, useEffect } from "react";
import { Button, Container, Input, Loader, RTE, Select } from "../index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createPostThunk, updatePostThunk } from "../../features/postSlice";
import { useNavigate } from "react-router-dom";
import { fileUploadThunk, deleteUploadThunk } from "../../features/fileSlice";
import { toast } from "react-toastify";

export default function PostForm({ post }) {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      shortDescription: post?.shortDescription || "",
      longDescription: post?.longDescription || "",
      slug: post?.slug || "",
      status: post?.status || "Active",
      blogImage: post?.blogImage || "",
    },
  });

  const { preview_URL_Arr } = useSelector((state) => state.file);
  const userData = useSelector((state) => state.auth.userData);

  const slugTransform = useCallback(
    (value) => {
      let transformedVal = value
        .trim()
        .toLowerCase()
        .replace(/[\s]+|[\W_]+/g, "-");
      return transformedVal;
    },
    [watch]
  );

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const postSubmit = async (data) => {
    Object.keys(data).forEach((key) => {
      console.log(data[key]);
    });
    if (post) {
      if (typeof data.blogImage === "object") {
        const fileArr = await dispatch(
          fileUploadThunk(data.blogImage[0])
        ).unwrap();
        if (fileArr) {
          data.blogImage = fileArr[1].$id;
          dispatch(deleteUploadThunk(post.blogImage));
        }
      }
      const updatedPost = await dispatch(
        updatePostThunk({ docID: post.$id, updatedObj: data })
      ).unwrap();
      if (updatedPost) {
        toast.success("Post updated successfully!");
        navigate(`/post/${updatedPost[0].slug}`);
      } else {
        toast.error("Falied to update Post!");
      }
    } else {
      const fileArr = await dispatch(
        fileUploadThunk(data.blogImage[0])
      ).unwrap();
      if (fileArr) {
        data.blogImage = fileArr[1].$id;
        const createdPost = await dispatch(
          createPostThunk({ ...data, userId: userData.$id })
        ).unwrap();
        if (createdPost) {
          toast.success("Post created successfully!");
          navigate(
            `/post/${
              createdPost.documents[createdPost.documents.length - 1].slug
            }`
          );
        } else {
          toast.error("Failed to create post!");
        }
      }
    }
  };

  return (
    <Container childElemClass="pt-20">
      <form onSubmit={handleSubmit(postSubmit)}>
        <div className="flex justify-between gap-5">
          <Input
            {...register("title", { required: "Title is required" })}
            label="Title"
            placeholder="Blog title"
            error={errors.title && errors.title.message}
            inpClass="w-full"
          />

          <Input
            {...register("slug", { required: "Slug is required" })}
            label="Slug"
            placeholder="Blog slug"
            readOnly
            error={errors.slug && errors.slug.message}
            inpClass="w-full"
          />
        </div>

        <div className="flex gap-5">
          <RTE
            name="shortDescription"
            label="Short Description"
            control={control}
            defaultValue={getValues("shortDescription")}
          />

          <RTE
            name="longDescription"
            label="Long Description"
            control={control}
            defaultValue={getValues("longDescription")}
          />
        </div>

        <div className="flex justify-between gap-5 mt-10">
          <Input
            {...register("blogImage", {
              required: !post ? "Image is required" : false,
            })}
            label="Blog Image"
            type="file"
            error={errors.blogImage && errors.blogImage.message}
            inpClass="w-full"
          />

          <Select
            options={["Active", "Inactive"]}
            label="Blog Status"
            {...register("status", { required: "Status is required" })}
            error={errors.status && errors.status.message}
          />
        </div>

        {post &&
          preview_URL_Arr.some(
            (preview) => preview.fileId === post.blogImage
          ) && (
            <img
              src={
                preview_URL_Arr.find(
                  (preview) => preview.fileId === post.blogImage
                )?.URL || ""
              }
              alt={`${post.title}'s image`}
              className="rounded-lg w-96 h-64 mt-4"
            />
          )}

        <Button myClass="mt-6" textColor="text-white" bgColor="bg-customPurple">
          {post ? "Update" : "Submit"}
        </Button>
      </form>
    </Container>
  );
}

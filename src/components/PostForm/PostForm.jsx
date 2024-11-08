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
      status: post?.status || "active",
      blogImage: post?.blogImage || "",
    },
  });

  const { preview_URL_Arr } = useSelector((state) => state.file);
  const userData = useSelector((state) => state.auth.userData);
  const { loading } = useSelector((state) => state.post);

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
    <Container>
      <form onSubmit={handleSubmit(postSubmit)}>
        <Input
          {...register("title", { required: "Title is required" })}
          label="title"
          placeholder="blog title"
          error={errors.title && errors.title.message}
        />
        <Input
          {...register("slug", { required: "Slug is required" })}
          label="slug"
          placeholder="blog slug"
          readOnly
          error={errors.slug && errors.slug.message}
        />

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

        <Input
          {...register("blogImage", {
            required: !post ? "Image is Required" : false,
          })}
          label="blog image"
          type="file"
          error={errors.blogImage && errors.blogImage.message}
        />

        <Select
          options={["active", "inactive"]}
          label="blog status"
          {...register("status", { required: "Status is required" })}
          error={errors.status && errors.status.message}
        />

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
            />
          )}

        {/* {errors.title && toast.error(errors.title.message)} */}
        {/* {errors.blogImage && toast.error(errors.blogImage.message)}
        {errors.slug && toast.error(errors.slug.message)}
        {errors.status && toast.error(errors.status.message)} */}

        <Button myClass="text-white">{post ? "Update" : "Submit"}</Button>
      </form>
    </Container>
  );
}

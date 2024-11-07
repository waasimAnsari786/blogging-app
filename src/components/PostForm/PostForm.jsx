import React, { useCallback, useEffect } from "react";
import { Button, Container, Input, RTE, Select } from "../index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createPostThunk, updatePostThunk } from "../../features/postSlice";
import { useNavigate } from "react-router-dom";
import { fileUploadThunk, deleteUploadThunk } from "../../features/fileSlice";

export default function PostForm({ post }) {
  const { handleSubmit, register, watch, setValue, control, getValues } =
    useForm({
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
    if (post) {
      if (data.blogImage.files) {
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
        navigate(`/post/${updatedPost[0].slug}`);
      }

      // const fileArr = await dispatch(
      //   fileUploadThunk(data.blogImage[0])
      // ).unwrap();
      // if (fileArr) {
      //   data.blogImage = fileArr[1].$id;
      //   const fileDeleted = await dispatch(
      //     deleteUploadThunk(post.blogImage)
      //   ).unwrap();
      //   if (fileDeleted) {
      //     const updatedPost = await dispatch(
      //       updatePostThunk({ docID: post.$id, updatedObj: data })
      //     ).unwrap();
      //     if (updatedPost) {
      //       navigate(`/post/${updatedPost[0].slug}`);
      //     }
      //   }
      // }
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
          navigate(
            `/post/${
              createdPost.documents[createdPost.documents.length - 1].slug
            }`
          );
        }
      }
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(postSubmit)}>
        <Input
          {...register("title", { required: true })}
          label="title"
          placeholder="blog title"
        />
        <Input
          {...register("slug", { required: true })}
          label="slug"
          placeholder="blog slug"
          readOnly
        />

        <RTE
          name="shortDescription"
          label="shortDescription"
          control={control}
          defaultValue={getValues("shortDescription")}
        />
        <RTE
          name="longDescription"
          label="longDescription"
          control={control}
          defaultValue={getValues("longDescription")}
        />

        <Input
          {...register("blogImage", { required: !post ? true : false })}
          label="blog image"
          type="file"
        />

        <Select
          options={["active", "inactive"]}
          label="blog status"
          s
          {...register("status", { required: true })}
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

        <Button myClass="text-white">{post ? "Update" : "Submit"}</Button>
      </form>
    </Container>
  );
}

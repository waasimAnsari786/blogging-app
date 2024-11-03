import React, { useCallback, useEffect } from "react";
import { Button, Container, Input, RTE, Select } from "../index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createPostThunk } from "../../features/postSlice";
import fileService from "../../appwrrite/fileService";
import { useNavigate } from "react-router-dom";

export default function PostForm({ post }) {
  const { handleSubmit, register, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        shortDescription: post?.shortDescription || "",
        longDescription: post?.longDescription || "",
        slug: post?.slug || "",
        status: "active",
      },
    });

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

  const showImagePreview = useCallback((e) => {
    const filesLength = e.target.files.length;
    if (filesLength > 0) {
      const imagePreview = fileService.getPreviewFile(e.target.files[0]);
      console.log(imagePreview);
    }
  }, []);

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

  const postSubmit = (data) => {
    if (post) {
    } else {
      const uploadImage = fileService
        .uploadFile(data.blogImage[0])
        .then((file) => {
          data.blogImage = file.$id;
          dispatch(createPostThunk({ ...data, userId: userData.$id }))
            .unwrap()
            .then((createdPost) => {
              navigate(
                `/post/${
                  createdPost.documents[createdPost.documents.length - 1].$id
                }`
              );
            })
            .catch((error) => console.log(error.message));
        })
        .catch((error) => console.log(error.message));
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
          {...register("blogImage", { required: true })}
          label="blog image"
          type="file"
          onChange={showImagePreview}
        />

        <Select
          options={["active", "inactive"]}
          label="blog status"
          s
          {...register("status", { required: true })}
        />

        <Button myClass="text-white">Submit</Button>
      </form>
    </Container>
  );
}

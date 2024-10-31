import React, { useCallback, useEffect } from "react";
import { Button, Container, Input, RTE, Select } from "../index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createPostThunk } from "../../features/postSlice";
import fileService from "../../appwrrite/fileService";

export default function PostForm({ post }) {
  const { handleSubmit, register, watch, setValue, control } = useForm({
    defaultValues: {
      title: post?.title || "",
      shortDescription: post?.shortDes || "",
      longDescription: post?.longDes || "",
      slug: post?.slug || "",
      status: post?.status || "active",
    },
  });

  const userData = useSelector((state) => state.auth.userData);

  const slugTransform = useCallback(
    (value) => {
      let transformedVal = value
        .trim()
        .toLowerCase()
        .replace(/[\s/]+|[\W_]+/g, "-");
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

  const postSubmit = (data) => {
    const uploadImage = fileService
      .uploadFile(data.blogImage[0])
      .then((file) => {
        data.blogImage = file.$id;
        dispatch(createPostThunk({ ...data, userId: userData.$id }));
      })
      .catch((error) => console.log(error.message));
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
        />
        <RTE name="longDescription" label="longDescription" control={control} />

        <Input
          {...register("blogImage", { required: true })}
          label="blog image"
          placeholder="blog image"
          type="file"
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

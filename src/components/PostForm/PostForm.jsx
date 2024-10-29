import React from "react";
import { Container, Input, Select } from "../index";
import { useForm } from "react-hook-form";

export default function PostForm({ post }) {
  const { handleSubmit, register, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        shortDescription: post?.shortDescription || "",
        longDescription: post?.longDescription || "",
        slug: post?.slug || "",
        blogImage: post?.blogImage || "",
        status: post?.status || "active",
      },
    });

  const postSubmit = () => {};

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
        />
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
      </form>
    </Container>
  );
}

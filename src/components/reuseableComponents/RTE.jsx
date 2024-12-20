import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import { toast } from "react-toastify";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        rules={{ required: `${label} is required` }}
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => {
          if (error) {
            toast.error(error.message);
          }
          return (
            <Editor
              apiKey="93scoanow47vrrrvyr82c6hev5986utjouss0sgblmx1sj3y"
              initialValue={defaultValue}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={onChange}
            />
          );
        }}
      />
    </div>
  );
}

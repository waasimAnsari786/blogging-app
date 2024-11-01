import React from "react";
import fileService from "../../appwrrite/fileService";
import parse from "html-react-parser";
import { MyTypoGraphy } from "../index";

export default function PostCard({ myClass = "", post, updatedDate }) {
  const {
    title,
    shortDescription,
    longDescription,
    status,
    blogImage,
    $createdAt,
    $updatedAt,
  } = post;

  let date = new Date($createdAt);

  return (
    <div className={`${myClass}`}>
      <img
        src={fileService.getPreviewFile(blogImage)}
        alt={`${title}'s image`}
      />
      <MyTypoGraphy myClass="text-3xl">{title}</MyTypoGraphy>
      {parse(shortDescription)}
      <MyTypoGraphy myClass="text-xl">Status: {status}</MyTypoGraphy>
      <MyTypoGraphy myClass="text-xl">
        Post Date: {date.toLocaleDateString()} at {date.toLocaleTimeString()}
      </MyTypoGraphy>
      {updatedDate && (
        <MyTypoGraphy myClass="text-xl">Update Date: {$updatedAt}</MyTypoGraphy>
      )}
    </div>
  );
}

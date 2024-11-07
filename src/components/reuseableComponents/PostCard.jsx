import React, { useCallback, useEffect, useState } from "react";
import parse from "html-react-parser";
import { MyTypoGraphy } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { getAllImagesThunk } from "../../features/fileSlice";

export default function PostCard({ myClass = "", post, updatedDate }) {
  const { title, shortDescription, status, blogImage, $createdAt, $updatedAt } =
    post;
  let date = new Date($createdAt);
  const dispatch = useDispatch();
  const { preview_URL_Arr } = useSelector((state) => state.file);

  useEffect(() => {
    dispatch(getAllImagesThunk());
  }, []);

  return (
    <div className={`${myClass}`}>
      {preview_URL_Arr.some((preview) => preview.fileId === blogImage) && (
        <img
          src={
            preview_URL_Arr.find((preview) => preview.fileId === blogImage)
              ?.URL || ""
          }
          alt={`${title}'s image`}
        />
      )}

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

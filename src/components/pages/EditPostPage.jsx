import React, { useEffect } from "react";
import { PostForm } from "../index";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postFilter } from "../../features/postSlice";

export default function EditPostPage() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const filteredPost = useSelector((state) => state.post.filteredPost);

  useEffect(() => {
    dispatch(postFilter(slug));
  }, [slug]);

  return (
    <>
      <PostForm post={filteredPost} />
    </>
  );
}

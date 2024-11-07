import React, { useEffect } from "react";
import { Button, Container, MyTypoGraphy, Loader } from "../index";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { deletePostThunk, postFilter } from "../../features/postSlice";
import { deleteUploadThunk } from "../../features/fileSlice";

export default function SinglePost() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    dispatch(postFilter(slug));
  }, [slug]);

  const filteredPost = useSelector((state) => state.post.filteredPost);

  const navigate = useNavigate();
  const date = new Date(filteredPost ? filteredPost.$createdAt : "");
  const isAuthor = filteredPost ? filteredPost.userId === userData.$id : false;

  const { preview_URL_Arr } = useSelector((state) => state.file);

  const deletePost = () => {
    dispatch(deletePostThunk(filteredPost.$id))
      .unwrap()
      .then(() => {
        dispatch(deleteUploadThunk(filteredPost.blogImage));
        navigate("/all-posts");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <Container childElemClass="grid grid-cols-2">
      {filteredPost && (
        <>
          <div>
            {preview_URL_Arr.some(
              (preview) => preview.fileId === filteredPost.blogImage
            ) && (
              <img
                src={
                  preview_URL_Arr.find(
                    (preview) => preview.fileId === filteredPost.blogImage
                  )?.URL || ""
                }
                alt={`${filteredPost.title}'s image`}
              />
            )}
          </div>
          <div>
            <MyTypoGraphy>{filteredPost.title}</MyTypoGraphy>
            {parse(filteredPost.longDescription || "")}
            <MyTypoGraphy>{date.toLocaleDateString()}</MyTypoGraphy>
            <MyTypoGraphy>{date.toLocaleTimeString()}</MyTypoGraphy>
            <MyTypoGraphy>{filteredPost.status}</MyTypoGraphy>

            {isAuthor && (
              <div>
                <NavLink to={`/edit-post/${filteredPost.slug}`}>
                  <Button myClass="text-white">edit</Button>
                </NavLink>

                <Button myClass="text-white" onClick={deletePost}>
                  delete
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </Container>
  );
}

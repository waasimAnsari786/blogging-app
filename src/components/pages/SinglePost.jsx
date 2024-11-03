import React, { useEffect } from "react";
import { Button, Container, MyTypoGraphy } from "../index";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import file from "../../appwrrite/fileService";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { deletePostThunk, postFilter } from "../../features/postSlice";

export default function SinglePost() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData);
  const filteredPost = useSelector((state) => state.post.filteredPost);

  useEffect(() => {
    dispatch(postFilter(slug));
  }, [slug]);

  const navigate = useNavigate();
  let date = new Date(filteredPost ? filteredPost.$createdAt : "");
  const isAuthor = filteredPost ? filteredPost.userId === userData.$id : false;

  const deletePost = () => {
    dispatch(deletePostThunk(slug))
      .unwrap()
      .then((deletedPost) => {
        file.deleteImage(filteredPost.blogImage);
        navigate("/all-posts");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <Container childElemClass="grid grid-cols-2">
      {filteredPost && (
        <>
          <div>
            <img
              src={file.getPreviewFile(filteredPost.blogImage) || ""}
              alt={filteredPost.title}
            />
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

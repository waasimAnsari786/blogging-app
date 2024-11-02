import React, { useState, useEffect } from "react";
import { Button, Container, MyTypoGraphy } from "../index";
import { useNavigate, useParams } from "react-router-dom";
import file from "../../appwrrite/fileService";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { deletePostThunk } from "../../features/postSlice";

export default function SinglePost() {
  const { slug } = useParams();
  const [singlePost, setSinglePost] = useState(null);
  const userData = useSelector((state) => state.auth.userData);
  const allPostsArr = useSelector((state) => state.post.postsArr);

  useEffect(() => {
    const getedSinglePost = allPostsArr.find((post) => post.slug === slug);
    if (getedSinglePost) {
      setSinglePost(getedSinglePost);
    }
  }, [slug]);

  const navigate = useNavigate();
  let date = new Date(singlePost ? singlePost.$createdAt : "");
  const isAuthor = singlePost ? singlePost.userId === userData.$id : false;

  const dispatch = useDispatch();
  const deletePost = () => {
    dispatch(deletePostThunk(slug))
      .unwrap()
      .then((deletedPost) => {
        navigate("/all-posts");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <Container childElemClass="grid grid-cols-2">
      {singlePost && (
        <>
          <div>
            <img src={file.getPreviewFile(singlePost.blogImage)} alt="" />
          </div>
          <div>
            <MyTypoGraphy>{singlePost.title}</MyTypoGraphy>
            {parse(singlePost.longDescription)}
            <MyTypoGraphy>{date.toLocaleDateString()}</MyTypoGraphy>
            <MyTypoGraphy>{date.toLocaleTimeString()}</MyTypoGraphy>
            <MyTypoGraphy>{singlePost.status}</MyTypoGraphy>

            {isAuthor && (
              <div>
                <Button myClass="text-white">edit</Button>
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

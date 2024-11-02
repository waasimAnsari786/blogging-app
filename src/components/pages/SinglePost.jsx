import React, { useState, useEffect } from "react";
import { Button, Container, MyTypoGraphy } from "../index";
import { useParams } from "react-router-dom";
import file from "../../appwrrite/fileService";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

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

  let date = new Date(singlePost ? singlePost.$createdAt : "");
  const isAuthor = singlePost ? singlePost.userId === userData.$id : false;

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
                <Button myClass="text-white">delete</Button>
              </div>
            )}
          </div>
        </>
      )}
    </Container>
  );
}

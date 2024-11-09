import React, { useEffect } from "react";
import { Button, Container, MyTypoGraphy } from "../index";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { deletePostThunk, postFilter } from "../../features/postSlice";
import { deleteUploadThunk } from "../../features/fileSlice";
import { toast } from "react-toastify";

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
  const date2 = new Date(filteredPost ? filteredPost.$updatedAt : "");
  const isAuthor = filteredPost ? filteredPost.userId === userData.$id : false;

  const { preview_URL_Arr } = useSelector((state) => state.file);

  const deletePost = async () => {
    dispatch(deletePostThunk(filteredPost.$id))
      .unwrap()
      .then(() => {
        dispatch(deleteUploadThunk(filteredPost.blogImage));
        toast.success("Post deleted succesfully");
        navigate("/all-posts");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Failed to delete post!");
      });
  };

  return (
    <Container childElemClass="grid grid-cols-2 w-2/3 gap-5 mt-20 border-[0.1rem] border-gray-300 rounded-xl p-2">
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
                className="w-full h-96 rounded-xl"
              />
            )}
          </div>
          <div className="relative">
            <MyTypoGraphy myClass="text-2xl font-bold capitalize">
              {filteredPost.title}
            </MyTypoGraphy>
            <h1 className="text-gray-600">
              {parse(filteredPost.longDescription || "")}
            </h1>
            <MyTypoGraphy myClass="text-[0.8rem] mt-3">
              Post Date : {date.toLocaleDateString()}
            </MyTypoGraphy>
            <MyTypoGraphy myClass="text-[0.8rem]">
              Update Date : {date2.toLocaleDateString()}
            </MyTypoGraphy>
            <MyTypoGraphy myClass="capitalize absolute bg-customPurple top-2 right-2 text-white rounded-md text-[0.7rem] px-2 py-1">
              {filteredPost.status}
            </MyTypoGraphy>

            {isAuthor && (
              <div className="mt-5 flex gap-3">
                <NavLink to={`/edit-post/${filteredPost.slug}`}>
                  <Button
                    bgColor="bg-customPurple"
                    myClass="text-white"
                    padding="px-2 py-1 capitalize"
                  >
                    edit
                  </Button>
                </NavLink>

                <Button
                  bgColor="bg-customPurple"
                  padding="px-2 py-1 capitalize"
                  myClass="text-white"
                  onClick={deletePost}
                >
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

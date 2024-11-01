import React, { useEffect } from "react";
import { Container, PostCard } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { getPostsThunk } from "../../features/postSlice";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { postsArr } = useSelector((state) => state.post);
  const authstatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsThunk());
  }, []);

  return (
    <>
      {authstatus ? (
        <Container childElemClass="grid grid-cols-3">
          {postsArr.map((post) => (
            <PostCard key={post.$id} post={post} />
          ))}
        </Container>
      ) : (
        <div className="text-center">
          <p>Login to read post!</p>
          <p>
            Don't have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      )}
    </>
  );
}

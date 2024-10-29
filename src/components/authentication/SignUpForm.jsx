import React from "react";
import { Container, Input, Button } from "../index";
import { useForm } from "react-hook-form";
import auth from "../../appwrrite/authService";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (data) => {
    const userAccount = await auth.createAccount({ ...data });
    if (userAccount) {
      const getUser = await auth.getCurrentUser();

      if (getUser) {
        dispatch(login(userAccount));
        navigate("/");
      }
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <Input
          label="name :"
          placeholder="your name"
          {...register("name", {
            required: true,
            minLength: 3,
          })}
        />
        <Input
          label="email :"
          placeholder="your email"
          {...register("email", {
            required: true,
            validate: {
              pattern: (value) =>
                /^[a-zA-Z0-9]+(?:[._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:-[a-zA-Z\d]+)*\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/.test(
                  value
                ) || "Email address must be a valid address",
            },
          })}
          type="email"
        />

        <Input
          label="password :"
          placeholder="your password"
          {...register("password", {
            required: true,
            minLength: 8 || alert("Password should at least 8 characters"),
          })}
          type="password"
        />

        <Button myClass="text-white">signup</Button>
      </form>
    </Container>
  );
}

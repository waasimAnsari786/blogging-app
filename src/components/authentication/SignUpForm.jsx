import React from "react";
import { Container, Input, Button } from "../index";
import { useForm } from "react-hook-form";
import auth from "../../appwrrite/authService";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (data) => {
    const userAccount = await auth.createAccount({ ...data });
    if (userAccount) {
      const getUser = await auth.getCurrentUser();

      if (getUser) {
        dispatch(login(userAccount));
        toast.success("Signup Successfully!");
        navigate("/");
      }
    } else {
      toast.error("Failed to Signup. Try again!");
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <Input
          label="name :"
          placeholder="your name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must contain at least 3 characters",
            },
          })}
        />
        <Input
          label="email :"
          placeholder="your email"
          {...register("email", {
            required: "Email is required",
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
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should at least 8 characters",
            },
          })}
          type="password"
        />

        <Button myClass="text-white">signup</Button>

        {errors.name && toast.error(errors.name.message)}
        {errors.email && toast.error(errors.email.message)}
        {errors.password && toast.error(errors.password.message)}
      </form>
    </Container>
  );
}

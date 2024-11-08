import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Input, Button } from "../index";
import { useForm } from "react-hook-form";
import auth from "../../appwrrite/authService";
import { login } from "../../features/authSlice";
import { AiOutlineMail } from "react-icons/ai";
import { toast, Bounce } from "react-toastify";

export default function LoginFrom() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    const userAccount = await auth.logInAccount({ ...data });
    if (userAccount) {
      const getUser = await auth.getCurrentUser();
      if (getUser) {
        toast.success("Login Successfully!");
        dispatch(login(userAccount));
        navigate("/");
      }
    } else {
      toast.error("Failed to login. Try again!");
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(handleLogin)}>
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
          icon={
            <>
              <AiOutlineMail />
            </>
          }
          error={errors.email && errors.email.message}
        />

        <Input
          label="password :"
          placeholder="your password"
          {...register("password", {
            required: "Password is reuired",
            minLength: {
              value: 8,
              message: "Password should at least 8 characters",
            },
          })}
          type="password"
          error={errors.password && errors.password.message}
        />

        <Button myClass="text-white">login</Button>
      </form>
    </Container>
  );
}

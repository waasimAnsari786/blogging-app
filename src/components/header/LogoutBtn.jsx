import React from "react";
import { Button } from "../index";
import auth from "../../appwrrite/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/authSlice";

export default function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const logedOut = auth.logOut();
    if (logedOut) {
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <Button onClick={handleLogout} bgColor="" myClass="text-white">
      Logout
    </Button>
  );
}

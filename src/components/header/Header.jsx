import React, { useId, useEffect } from "react";
import { Container, LogoutBtn } from "../index";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import auth from "../../appwrrite/authService";
import { login } from "../../features/authSlice";

export default function Header() {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const isLogedIn = await auth.getCurrentUser();
    if (isLogedIn) {
      dispatch(login(isLogedIn));
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    { name: "Home", slug: "/", active: true, id: useId() },
    { name: "Login", slug: "/login", active: !authStatus, id: useId() },
    { name: "SignUp", slug: "/signup", active: !authStatus, id: useId() },
    { name: "Add Post", slug: "/add-post", active: authStatus, id: useId() },
    { name: "All Post", slug: "/all-posts", active: authStatus, id: useId() },
  ];

  return (
    <Container childElemClass="flex justify-between">
      <div className="w-16">
        <p className="text-3xl">logo</p>
      </div>
      <div className="w-1/2">
        <nav>
          <ul className="flex gap-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.id}>
                  <NavLink to={item.slug}>{item.name}</NavLink>
                </li>
              ) : null
            )}
            {authStatus && <LogoutBtn />}
          </ul>
        </nav>
      </div>
    </Container>
  );
}

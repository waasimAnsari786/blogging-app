import React, { useId, useEffect, useState } from "react";
import { Container, LogoutBtn } from "../index";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import auth from "../../appwrrite/authService";
import { login } from "../../features/authSlice";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Icons for GitHub and LinkedIn

export default function Header() {
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

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
    <header className="w-full bg-customPurple">
      <Container childElemClass="flex justify-between items-center">
        {/* Logo Div, hidden when mobile menu is open */}
        {!isMobileMenuOpen && (
          <div className="w-[30%] md:w-[11%] rounded-md p-2">
            <img
              src="/logo/wa blogging logo.png"
              alt="logo"
              className="w-full"
            />
          </div>
        )}

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white text-3xl"
          >
            {isMobileMenuOpen ? <HiX /> : <HiOutlineMenu />}
          </button>
        </div>

        {/* Desktop and Mobile Navigation */}
        <div
          className={`${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } fixed md:static top-0 right-0 md:flex md:translate-x-0 w-2/3 md:w-auto h-screen md:h-auto bg-customPurple md:bg-transparent transition-transform duration-300 ease-in-out z-50`}
        >
          {/* Mobile Menu Header with centered items */}
          {isMobileMenuOpen && (
            <div className="flex flex-col items-center justify-center h-full py-4 gap-6">
              {/* Logo at the bottom of the mobile menu */}
              <div className="w-[80%] sm:w-[30%] bg-customPurple rounded-md">
                <img src="/logo/FullLogo.png" alt="logo" className="w-full" />
              </div>

              {/* Navigation Items */}
              <nav>
                <ul className="flex flex-col items-center gap-4">
                  {navItems.map(
                    (item) =>
                      item.active && (
                        <li key={item.id}>
                          <NavLink
                            to={item.slug}
                            className={({ isActive }) =>
                              `text-white transition duration-300 px-2 py-1 rounded-lg ${
                                isActive
                                  ? "bg-white text-customPurple"
                                  : "hover:text-customPurple hover:bg-white"
                              }`
                            }
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              document.title = `Blogging App - ${
                                item.slug === "/"
                                  ? "Home"
                                  : item.slug.split("/").join("")
                              }`;
                            }} // Close menu on link click in mobile
                          >
                            {item.name}
                          </NavLink>
                        </li>
                      )
                  )}
                  {authStatus && <LogoutBtn />}
                </ul>
              </nav>

              {/* Social Icons */}
              <div className="flex gap-4 mb-4">
                <Link
                  to="https://github.com/waasimAnsari786"
                  className="text-white text-xl"
                >
                  <FaGithub />
                </Link>
                <Link
                  to="https://www.linkedin.com/in/waasim-ansari-39741b28b/"
                  className="text-white text-xl"
                >
                  <FaLinkedin />
                </Link>
              </div>
            </div>
          )}

          {/* Navigation Items */}
          {!isMobileMenuOpen && (
            <nav>
              <ul className="flex items-center gap-4">
                {navItems.map(
                  (item) =>
                    item.active && (
                      <li key={item.id}>
                        <NavLink
                          to={item.slug}
                          className={({ isActive }) =>
                            `text-white transition duration-300 px-2 py-1 rounded-lg ${
                              isActive
                                ? "bg-white text-black"
                                : "hover:text-customPurple hover:bg-white"
                            }`
                          }
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            document.title = `Blogging App - ${
                              item.slug === "/"
                                ? "Home"
                                : item.slug.split("/").join("")
                            }`;
                          }} // Close menu on link click in mobile
                        >
                          {item.name}
                        </NavLink>
                      </li>
                    )
                )}
                {authStatus && <LogoutBtn />}
              </ul>
            </nav>
          )}
        </div>
      </Container>
    </header>
  );
}

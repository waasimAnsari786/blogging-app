import "./index.css";
import {
  LoginFrom,
  MyWeb,
  SignUpForm,
  PostForm,
  AuthProtectedLayout,
} from "./components/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MyWeb />,
      children: [
        {
          path: "login",
          element: (
            <AuthProtectedLayout authentication={false}>
              <LoginFrom />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "signup",
          element: (
            <AuthProtectedLayout authentication={false}>
              <SignUpForm />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "add-post",
          element: (
            <AuthProtectedLayout authentication>
              <PostForm />
            </AuthProtectedLayout>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;

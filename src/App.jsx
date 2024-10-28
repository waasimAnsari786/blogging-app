import "./index.css";
import { LoginFrom, MyWeb, SignUpForm } from "./components/index";
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
          element: <LoginFrom />,
        },
        {
          path: "signup",
          element: <SignUpForm />,
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

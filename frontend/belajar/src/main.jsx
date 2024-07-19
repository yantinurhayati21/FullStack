import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import "./index.css";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import FilmList from "./pages/FilmList.jsx";
import AddFilm from "./pages/AddFilm.jsx";
import EditFilm from "./pages/EditFilm.jsx";
import ReviewList from "./pages/ReviewList.jsx";
import AddReview from "./pages/AddReview.jsx";
import EditReview from "./pages/EditReview.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/films",
        element: <FilmList />,
      },
      {
        path: "/films/add",
        element: <AddFilm />,
      },
      {
        path: "films/edit/:id",
        element: <EditFilm />,
      },
      {
        path: "/reviews",
        element: <ReviewList />,
      },
      {
        path: "/reviews/add",
        element: <AddReview />,
      },
      {
        path: "reviews/edit/:id",
        element: <EditReview />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
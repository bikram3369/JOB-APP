import { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import Home from "@/components/Pages/Home";
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import Jobs from "@/components/Pages/Jobs";
import React from "react";
import Browse from "@/components/Pages/Browse";
import Profile from "@/components/Pages/profile";
import JobDetails from "@/components/pagecomponents/JObpagecomponent/JobDetails";
import Companies from "@/admin/companies";
import CompanyCreate from "@/admin/CompanyCreate";
import CompanySetup from "@/admin/CompanySetup";
import AdminJobs from "@/admin/AdminJobs";
import Applicants from "@/admin/Applicants";



import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PostJob from "./admin/PostJob";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "jobs",
      element: <Jobs />,
    },
    {
      path: "browse",
      element: <Browse />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/description/:id",
      element: <JobDetails />,
    },

    //admin routes
    {
      path: "/admin/companies",
      element: <Companies />,
    },
    {
      path: "/admin/companies/create",
      element: <CompanyCreate />,
    },
    {
      path: "/admin/companies/:id",
      element: <CompanySetup />,
    },
    {
      path: "/admin/jobs",
      element: <AdminJobs />,
    },
    {
      path: "/admin/jobs/create",
      element: <PostJob />,
    },
    {
    path:"/admin/jobs/:id/applicants",
    element:<Applicants/>
  },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;

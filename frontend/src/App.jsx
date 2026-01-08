import { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/shared/Navbar";
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
import ProtectedRoute from "./admin/ProtectedRoute";

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
      element: <ProtectedRoute><Companies /></ProtectedRoute>,
    },
    {
      path: "/admin/companies/create",
      element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>,
    },
    {
      path: "/admin/companies/:id",
      element: <ProtectedRoute><CompanySetup /></ProtectedRoute>,
    },
    {
      path: "/admin/jobs",
      element: <ProtectedRoute><AdminJobs /></ProtectedRoute>,
    },
    {
      path: "/admin/jobs/create",
      element: <ProtectedRoute><PostJob /></ProtectedRoute>,
    },
    {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
  },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;

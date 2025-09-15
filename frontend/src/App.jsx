import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import Home from '@/components/Pages/Home'
import Login from '@/components/auth/Login'
import Signup from '@/components/auth/Signup'
import Jobs from '@/components/Pages/Jobs'
import React from 'react'
import Browse from '@/components/Pages/Browse'
import Profile from '@/components/Pages/profile'
import JobDetails from '@/components/pagecomponents/JObpagecomponent/JobDetails'
import Companies from '@/admin/companies'

import { createBrowserRouter , RouterProvider } from 'react-router-dom'

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/signup",
      element: <Signup/>
    },
    {
      path: "jobs",
      element: <Jobs/>
    },
    {
      path: "browse",
      element: <Browse/>
    },
    {
      path: "/profile",
      element: <Profile/>
    },
    {
      path: "/description/:id",
      element: <JobDetails/>
    },

      //admin routes
      {
    path:"/admin/companies",
    element: <Companies/>
  },
    
  ])

  return (
    <>
      
      <RouterProvider router={appRouter}/>
      
    </>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import Home from '@/components/Pages/Home'
import Login from '@/components/auth/Login'
import Signup from '@/components/auth/Signup'
import Jobs from '@/components/Pages/Jobs'
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
    }
  ])

  return (
    <>
      
      <RouterProvider router={appRouter}/>
      
    </>
  )
}

export default App

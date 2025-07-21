import {createBrowserRouter} from "react-router";
import RootLayout from "../layouts/RootLayout";
import AllTrainers from "../pages/All-Trainers/AllTrainers";
import AllClasses from "../pages/All-Classes/AllClasses";
import Community from "../pages/Community/Community";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import SignUp from "../pages/Authentication/sign-up/SignUp";
import Home from "../pages/Home/Home/Home";
import CommunityDetails from "../pages/community Details/CommunityDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
        {
            index:true,
            Component:Home,
        },
        {
            path:"/all-trainers",
            Component:AllTrainers,
        },
        {
            path:"/all-classes",
            Component:AllClasses,
        },
         {
            path:"/community",
            Component:Community,
        },
       
    ]
  },
     { 
        path:"/community/:id",
        Component:<CommunityDetails></CommunityDetails>,
     },
  {
    path:"/",
    Component:AuthLayout,
    errorElement:<p>error</p>,
    children:[
      {
        path:"login",
        Component:Login,
      },
      {
        path:"signup",
        Component:SignUp,
      }
    ]
  }
]);
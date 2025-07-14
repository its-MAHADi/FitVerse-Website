import {createBrowserRouter} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../../pages/Home/Home";
import AllTrainers from "../../pages/All-Trainers/AllTrainers";
import AllClasses from "../../pages/All-Classes/AllClasses";
import Community from "../../pages/Community/Community";


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
]);
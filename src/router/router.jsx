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
import TrainerDetails from "../pages/Trainers Details/TrainerDetails";
import TrainerBooked from "../pages/TrainerBooked/TrainerBooked";
import BecomeTrainer from "../pages/BecomeTrainer/BecomeTrainer";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import DashboardLayout from "../layouts/DashboardLayout";
import { AdminRoute, MemberRoute, TrainerRoute } from "../routes/RoleRoutes";
import NewsletterSubscribers from "../pages/Dashboard/Admin/NewsletterSubscribers";
import AllTrainersDashboard from "../pages/Dashboard/Admin/AllTrainersDashboard";
import AppliedTrainers from "../pages/Dashboard/Admin/AppliedTrainers";
import Balance from "../pages/Dashboard/Admin/Balance";
import AddClass from "../pages/Dashboard/Admin/AddClass";
import ManageSlots from "../pages/Dashboard/Trainer/ManageSlots";
import AddSlot from "../pages/Dashboard/Trainer/AddSlot";
import AddForum from "../pages/Dashboard/Trainer/AddForum";
import ActivityLog from "../pages/Dashboard/Member/ActivityLog";
import Profile from "../pages/Dashboard/Member/Profile";
import BookedTrainer from "../pages/Dashboard/Member/BookedTrainer";
import AddCommunity from "../pages/Dashboard/Admin/AddCommunity";
import AdminManageUsers from "../pages/Dashboard/Admin/AdminManageUsers/AdminManageUsers";
import AdminUserDetails from "../pages/Dashboard/Admin/AdminManageUsers/AdminUserDetails";
import TrainerApplicationDetails from "../pages/Dashboard/Admin/TrainerApplicationDetails";

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
        Component:CommunityDetails,
     },
     { 
        path:"/trainers/:id",
        Component:TrainerDetails,
     },
     { 
        path:"/trainer-booked/:id",
        Component:TrainerBooked,
     },
     { 
        path:"/become-trainer",
        Component:BecomeTrainer,
     },
     { 
        path:"/create-payment-intent",
        Component:PaymentPage,
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
  },
  {
    path:"/dashboard",
    element:<DashboardLayout></DashboardLayout>,
    children:[
        // ================= ADMIN ROUTES =================
      {
        path:"admin/newsletter",
         element: <AdminRoute>
          <NewsletterSubscribers></NewsletterSubscribers>
         </AdminRoute>
      },
      {
        path:"admin/all-trainers",
         element: <AdminRoute>
          <AllTrainersDashboard></AllTrainersDashboard>
         </AdminRoute>
      },
      {
        path:"admin/applied-trainer",
         element: <AdminRoute>
         <AppliedTrainers></AppliedTrainers>
         </AdminRoute>
      },
      {
        path: "admin/applied-trainer/:id",
        element: <AdminRoute><TrainerApplicationDetails /></AdminRoute>,
       },
      {
        path:"admin/balance",
         element: <AdminRoute>
         <Balance></Balance>
         </AdminRoute>
      },
      {
        path:"admin/add-class",
         element: <AdminRoute>
         <AddClass></AddClass>
         </AdminRoute>
      },
      {
        path:"admin/add-Community",
         element: <AdminRoute>
         <AddCommunity></AddCommunity>
         </AdminRoute>
      },
        // ================== MANAGE USERS ==================
    // ================== MANAGE USERS ==================
    {
  path: "admin/users",
  element: (
    <AdminRoute>
      <AdminManageUsers />
    </AdminRoute>
  ),
},
{
  path: "admin/users/:email",
  element: (
    <AdminRoute>
      <AdminUserDetails />
    </AdminRoute>
  ),
},

      // ================= TRAINER ROUTES =================
    {
      path: "trainer/manage-slots",
      element: <TrainerRoute> <ManageSlots></ManageSlots> </TrainerRoute>,
    },
    {
      path: "trainer/add-slot",
      element: <TrainerRoute> <AddSlot></AddSlot> </TrainerRoute>,
    },
    {
      path: "trainer/add-forum",
      element: <TrainerRoute> <AddForum></AddForum> </TrainerRoute>,
    },

    // ================= MEMBER ROUTES =================
    {
      path: "member/activity-log",
      element: <MemberRoute> <ActivityLog></ActivityLog> </MemberRoute>,
    },
    {
      path: "member/profile",
      element: <MemberRoute> <Profile></Profile> </MemberRoute>,
    },
    {
      path: "member/booked-trainer",
      element: <MemberRoute> <BookedTrainer></BookedTrainer> </MemberRoute>,
    },
    ]
  }
]);
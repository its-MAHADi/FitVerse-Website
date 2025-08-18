import { Outlet, NavLink, useNavigate } from "react-router";
import UseAuth from "../Hooks/UseAuth";
import { useState } from "react";
import { Menu, X, Home, LogOut, Users, Mail, Wallet, Plus, ClipboardList, Activity, ActivityIcon, } from "lucide-react";

const DashboardLayout = () => {
  const { user, logOut } = UseAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logOut().then(() => navigate("/"));
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
      isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-50 h-full lg:h-auto w-64 bg-white border-r shadow-md p-5 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600">Dashboard</h2>
          <button
            className="lg:hidden bg-blue-500 text-white p-1 rounded-full"
            onClick={toggleSidebar}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col gap-2">
          {user?.role === "admin" && (
            <>
             <NavLink to="/dashboard/admin/overview" className={linkClasses}>
               <ActivityIcon className="w-4 h-4" /> Overview
            </NavLink>
              <NavLink to="/dashboard/admin/newsletter" className={linkClasses}>
                <Mail className="w-4 h-4" /> Newsletter
              </NavLink>
              <NavLink to="/dashboard/admin/all-trainers" className={linkClasses}>
                <Users className="w-4 h-4" /> All Trainers
              </NavLink>
              <NavLink to="/dashboard/admin/applied-trainer" className={linkClasses}>
                <ClipboardList className="w-4 h-4" /> Applied Trainers
              </NavLink>
              <NavLink to="/dashboard/admin/balance" className={linkClasses}>
                <Wallet className="w-4 h-4" /> Balance
              </NavLink>
              <NavLink to="/dashboard/admin/add-class" className={linkClasses}>
                <Plus className="w-4 h-4" /> Add Class
              </NavLink>
                <NavLink to="/dashboard/admin/users" className={linkClasses}>
                <Users className="w-4 h-4" /> Manage Users
                </NavLink>
            </>
          )}

          {user?.role === "trainer" && (
            <>
              <NavLink to="/dashboard/trainer/manage-slots" className={linkClasses}>
                <ClipboardList className="w-4 h-4" /> Manage Slots
              </NavLink>
              <NavLink to="/dashboard/trainer/add-slot" className={linkClasses}>
                <Plus className="w-4 h-4" /> Add Slot
              </NavLink>
              <NavLink to="/dashboard/trainer/add-forum" className={linkClasses}>
                <Plus className="w-4 h-4" /> Add Forum
              </NavLink>
            </>
          )}

          {user?.role === "member" && (
            <>
              <NavLink to="/dashboard/member/profile" className={linkClasses}>
                <Users className="w-4 h-4" /> Profile
              </NavLink>
              <NavLink to="/dashboard/member/activity-log" className={linkClasses}>
                <Activity className="w-4 h-4" /> Activity Log
              </NavLink>
              <NavLink to="/dashboard/member/booked-trainer" className={linkClasses}>
                <ClipboardList className="w-4 h-4" /> Booked Trainer
              </NavLink>
            </>
          )}
        </nav>

        {/* Bottom Links */}
        <div className="mt-6 border-t pt-4 flex flex-col gap-2">
          <NavLink to="/" className={linkClasses}>
            <Home className="w-4 h-4" /> Home
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-red-600 hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-4 lg:p-6">
        {/* Hamburger for mobile */}
        <button
          className="lg:hidden p-2 mb-4 bg-blue-500 text-white rounded-md"
          onClick={toggleSidebar}
        >
          <Menu className="w-6 h-6" />
        </button>

        <Outlet />
      </main>

      {/* Overlay for sidebar on mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 lg:hidden z-40"
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;

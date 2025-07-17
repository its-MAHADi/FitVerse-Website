import React from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  MobileNav,
} from "@material-tailwind/react";
import { Link, NavLink } from "react-router"; 

export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navList = (
    <ul className="flex flex-col lg:flex-row lg:items-center font-semibold gap-6">
         <NavLink className={({isActive})=>(isActive? "bg-blue-600 px-2 py-1 rounded-md text-white" : "")} to="/">Home</NavLink>
          <NavLink  className={({isActive})=>(isActive? "bg-blue-600 px-2 py-1 rounded-md text-white" : "")} to="/all-trainers">All Trainers</NavLink>
          <NavLink  className={({isActive})=>(isActive? "bg-blue-600 px-2 py-1 rounded-md text-white" : "")} to="/all-classes">All Classes</NavLink>
          <NavLink  className={({isActive})=>(isActive? "bg-blue-600 px-2 py-1 rounded-md text-white" : "")} to="/community">Community</NavLink>
          <NavLink  className={({isActive})=>(isActive? "bg-blue-600 px-2 py-1 rounded-md text-white" : "")} to="/dashboard"> Dashboard</NavLink>
    </ul>
  );

  return (
    <Navbar
      className="sticky top-0 z-50 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-white/50 backdrop-blur-md shadow-sm text-black border-none"
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Typography
          as={Link}
          to="/"
          className=" text-2xl font-bold cursor-pointer"
        >
         <span className="text-blue-600"> Fit</span>Verse
        </Typography>

        {/* Center Nav links */}
        <div className="hidden lg:flex flex-1 justify-center">
          {navList}
        </div>

        {/* Right buttons */}
        <div className="hidden lg:flex items-center gap-5">
          <Link to="/login">
            <Button className="bg-gray-200 px-4 py-2 rounded-md cursor-pointer" variant="text" size="lg">
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="text-black border-1 px-3 py-2 rounded-md hover:bg-green-600 hover:text-white cursor-pointer" variant="gradient" size="lg">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile menu icon */}
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </IconButton>
      </div>

      {/* Mobile nav */}
      <MobileNav open={openNav} className="lg:hidden">
        <div className="my-4">
          {navList}
        </div>
        <div className="flex gap-2">
          <Link to="/login" className="w-full bg-gray-300 rounded-md ">
            <Button fullWidth variant="text" size="sm">
              Log In
            </Button>
          </Link>
          <Link to="/register" className="w-full bg-green-600 rounded-md">
            <Button fullWidth variant="gradient" size="sm">
              Sign Up
            </Button>
          </Link>
        </div>
      </MobileNav>
    </Navbar>
  );
}

import React from "react";
import { Typography } from "@material-tailwind/react";
import { Link, NavLink } from "react-router";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-blue-gray-700 border-t py-10 px-4 mt-16 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
         <Typography variant="h5" className="mb-2 font-bold text-2xl">
        <span className="text-blue-600"> Fit</span>Verse
      </Typography>
          <p className="text-sm text-gray-600 leading-relaxed">
            FitVerse is your all-in-one fitness destination in Bangladesh. Discover certified trainers, join exciting classes, and connect with a vibrant fitness community.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <Typography variant="h6" className="mb-3 font-semibold">
            Navigation
          </Typography>
          <ul className="space-y-2 text-sm text-gray-700">
             <li>
              <NavLink className={({isActive})=>(isActive? "border-b-2" : "")} to="/">Home</NavLink>
            </li>
            <li>
               <NavLink  className={({isActive})=>(isActive? "border-b-2" : "")} to="/all-trainers">All Trainers</NavLink>
            </li>
            <li>
              <NavLink  className={({isActive})=>(isActive? "border-b-2" : "")} to="/all-classes">All Classes
</NavLink>
            </li>
            <li>
            <NavLink  className={({isActive})=>(isActive? "border-b-2 " : "")} to="/community"> Community</NavLink>
            </li>
            <li>
          <NavLink  className={({isActive})=>(isActive? "border-b-2 " : "")} to="/Wishlist"> Dashboard</NavLink>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <Typography variant="h6" className="mb-3 font-semibold">
            Support
          </Typography>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <Typography variant="h6" className="mb-3 font-semibold">
            Follow Us
          </Typography>
          <div className="flex gap-4 text-blue-gray-700 text-lg">
             <a href="https://www.facebook.com/mh.mahadi.921944/" target='_blank'><FaFacebook className='text-blue-500' size={24} /></a>
             <a href="https://github.com/its-MAHADi" target='_blank'><FaGithub size={24} /></a>
             <a href="https://www.instagram.com/__m_a_h_a_d_i___/" target='_blank'><FaInstagram  className='text-pink-500' size={24} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} FitVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

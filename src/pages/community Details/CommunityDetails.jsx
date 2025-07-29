import React from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaCalendarAlt, FaUser, FaFlag, FaArrowLeft } from "react-icons/fa";
import StickyNavbar from "../Shared/Navbar/StickyNavbar";

const fetchPostDetails = async (id) => {
  const { data } = await axios.get(`https://fit-verse-server-nine.vercel.app/communityPosts/${id}`);
  return data;
};

const CommunityDetails = () => {
  const { id } = useParams();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["forumPost", id],
    queryFn: () => fetchPostDetails(id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading post details...</p>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-600">
          Failed to load post details.
        </p>
        <Link
          to="/community"
          className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Community
        </Link>
      </div>
    );
  }

  return (
   <div>
    <StickyNavbar></StickyNavbar>
     <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/community"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
        >
          <FaArrowLeft className="text-lg" />
          Back to Community
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        {post.title}
      </h1>

      {/* Author, Country & Date */}
      <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-6">
        <div className="flex items-center gap-2">
          <FaUser className="text-blue-600" />
          <span className="font-medium">{post.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaFlag className="text-green-600" />
          <span>{post.country}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-red-600" />
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Image */}
      <div className="overflow-hidden rounded-xl shadow-lg mb-6">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Description */}
      <p className="text-gray-700 text-lg leading-relaxed">{post.description}</p>
    </div>
   </div>
  );
};

export default CommunityDetails;

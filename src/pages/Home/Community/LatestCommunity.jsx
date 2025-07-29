import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import { FaCalendarAlt } from "react-icons/fa";

const fetchCommunityPosts = async () => {
  const { data } = await axios.get("https://fit-verse-server-nine.vercel.app/communityPosts");
  return data || [];
};

const LatestCommunity = () => {
  const { data: posts = [], isLoading, isError } = useQuery({
    queryKey: ["forumPosts"],
    queryFn: fetchCommunityPosts,
  });

  if (isLoading) {
    return <p className="text-center text-lg font-semibold">Loading community posts...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-600 font-semibold">Failed to load posts.</p>;
  }

  const latestPosts = [...posts]
    .sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
    .slice(0, 6);

  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
          <span className="text-black"> Latest</span> Community Posts
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={post?.image || "https://via.placeholder.com/300x200"}
                  alt={post?.title || "Community Post"}
                  className="w-full h-52 object-cover transform hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {post?.author || "Unknown Author"}
                    </h3>
                    <p className="text-sm text-gray-500">{post?.country || "Unknown Country"}</p>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <FaCalendarAlt className="mr-1 text-blue-600" />
                    {post?.createdAt
                      ? new Date(post.createdAt).toLocaleDateString()
                      : "N/A"}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-[15px] font-bold mb-2 text-gray-800">
                  {post?.title || "Untitled Post"}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4">
                  {post?.description && post.description.length > 70 ? (
                    <>
                      {post.description.slice(0, 70)}...
                      <Link
                        to={`/community/${post._id}`}
                        className="text-blue-600 font-medium hover:underline ml-1"
                      >
                        Read More
                      </Link>
                    </>
                  ) : (
                    post?.description || "No description available"
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCommunity;

import React, { useEffect, useState, } from "react";
import axios from "axios"; 
import { Link } from "react-router";
import UseAuth from "../../Hooks/UseAuth"; // ধরে নিচ্ছি লগইন কনটেক্সট আছে

const Community = () => {
  const { user } = UseAuth() // লগইন ইউজার
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/community?page=${currentPage}&limit=${limit}`
      );
      setPosts(res.data.posts);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const handleVote = async (postId, type) => {
    if (!user) {
      alert("You need to log in to vote!");
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:5000/community/${postId}/vote`,
        { userEmail: user.email, voteType: type }
      );

      // Update votes instantly
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? { ...p, upvotes: res.data.upvotes, downvotes: res.data.downvotes }
            : p
        )
      );
    } catch (err) {
      console.error("Voting error:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Community Forum</h2>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white border rounded-lg shadow hover:shadow-lg p-5"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
            {/* <p className="text-gray-600 mb-4">{post.content.slice(0, 100)}...</p> */}

            <div className="flex justify-between items-center">
              {/* Voting */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleVote(post._id, "up")}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  👍 {post.upvotes || 0}
                </button>
                <button
                  onClick={() => handleVote(post._id, "down")}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  👎 {post.downvotes || 0}
                </button>
              </div>

              {/* View Details */}
              <Link
                to={`/community/${post._id}`}
                className="text-blue-600 hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Prev
        </button>
        {[...Array(totalPages).keys()].map((n) => (
          <button
            key={n + 1}
            onClick={() => setCurrentPage(n + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === n + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {n + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Community;

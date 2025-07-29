import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import UseAuth from "../../../Hooks/UseAuth";

const AddForum = () => {
  const { user } = UseAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return Swal.fire("Error", "All fields required", "error");

    try {
      const payload = {
        title,
        content,
        author: user.displayName || user.email,
        role: user.role, // "trainer" or "admin"
      };
      await axios.post("https://fit-verse-server-nine.vercel.app/forums", payload);
      Swal.fire("Success", "Forum added successfully!", "success");
      setTitle("");
      setContent("");
    } catch (error) {
      Swal.fire("Error", "Failed to add forum", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 mt-6 rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">Add New Forum</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Forum Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          rows="4"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Add Forum
        </button>
      </form>
    </div>
  );
};

export default AddForum;

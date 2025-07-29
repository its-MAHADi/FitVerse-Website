import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import UseAuth from "../../../Hooks/UseAuth";
// ধরো useAuth হুক থেকে user পাচ্ছো


const AddClass = () => {
  const { user } = UseAuth(); // লগইন ইউজার
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    totalBookings: 0,
    rating: 0,
  });

  const [previewImage, setPreviewImage] = useState(null);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setFormData({ ...formData, image: imageUrl }); // preview এর সাথে data তে সেট
    }
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const classData = {
        ...formData,
        trainerId: user?._id || user?.email || "unknown-trainer",
        createdAt: new Date(),
      };

      const res = await axios.post("https://fit-verse-server-nine.vercel.app/add-class", classData);

      if (res.data.success) {
        Swal.fire({
          title: "Success!",
          text: "Class added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Reset form
        setFormData({
          name: "",
          description: "",
          image: "",
          totalBookings: 0,
          rating: 0,
        });
        setPreviewImage(null);
      } else {
        Swal.fire("Error", "Failed to add class", "error");
      }
    } catch (error) {
      console.error("Error adding class:", error);
      Swal.fire("Error", "Server error occurred", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
        ADD NEW CLASS
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Add a new class to ensure and update materials
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Class Name */}
        <div>
          <label className="block text-gray-700 mb-2">Class Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter class name"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Class Image */}
        <div>
          <label className="block text-gray-700 mb-2">Class Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover rounded border"
            />
          )}
        </div>

        {/* Class Details */}
        <div>
          <label className="block text-gray-700 mb-2">Class Details</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Class details"
            rows="4"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-gray-700 mb-2">Rating</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="5"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Total Bookings */}
        <div>
          <label className="block text-gray-700 mb-2">Total Bookings</label>
          <input
            type="number"
            name="totalBookings"
            value={formData.totalBookings}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddClass;

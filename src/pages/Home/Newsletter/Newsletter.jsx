import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/newsletter", formData);
      toast.success("Thank you for subscribing!");
      setFormData({ name: "", email: "" });
    } catch (error) {
      toast.error("Subscription failed. Try again!");
    }
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Left Side */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            SUBSCRIBE TO OUR <span className="text-blue-500">NEWSLETTER!!</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-md mx-auto md:mx-0">
            Subscribe our newsletter to get exciting latest and updated news.
            So you stay connected to our forums.
          </p>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 w-full">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Your Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="px-6 py-3 cursor-pointer bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition w-full md:w-auto"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

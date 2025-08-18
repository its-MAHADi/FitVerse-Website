import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaClock, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router";

const fetchTrainers = async () => {
  const { data } = await axios.get("https://fit-verse-server-nine.vercel.app/trainers");
  return data;
};

const AllTrainers = () => {
  const { data: trainers = [], isLoading, isError } = useQuery({
    queryKey: ["trainers"],
    queryFn: fetchTrainers,
  });

  if (isLoading) {
    return <p className="text-center text-xl py-10">Loading trainers...</p>;
  }

  if (isError) {
    return <p className="text-center text-xl text-red-600 py-10">Failed to load trainers.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">All Trainers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainers.map((trainer) => (
          <div
            key={trainer._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
             {/* Image */}
            <div className="relative group">
              <img
                src={trainer.photo}
                alt={trainer.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              {/* Social Icons */}
              <div className="absolute bottom-3 left-3 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <a
                  href=""
                  className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-800"
                >
                  <FaFacebookF />
                </a>
                <a
                  href=""
                  className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-800"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href=""
                  className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-800"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
            {/* Content */}
            <div className="p-4">
              {/* Age & Experience */}
              <div className="flex justify-between text-gray-700 text-sm mb-2">
                <span>Age: {trainer.age} yrs</span>
                <span>Experience: {trainer.experience} yrs</span>
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{trainer.name}</h3>

              {/* Available Slots */}
             <p className="text-blue-600 font-medium mb-2">Available Slots:</p>
<ul className="space-y-1 mb-4">
  {Array.isArray(trainer.slots) && trainer.slots.length > 0 ? (
    trainer.slots.slice(0, 2).map((slot, idx) => (
      <li key={idx} className="flex items-center gap-2 text-gray-700 text-sm">
        <FaClock className="text-blue-500" /> {slot}
      </li>
    ))
  ) : (
    <li className="text-gray-500 text-sm">No slots available</li>
  )}
</ul>


              {/* Know More Button */}
              <Link
                to={`/trainers/${trainer._id}`}
                className="block text-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-800 transition"
              >
                Know More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTrainers;

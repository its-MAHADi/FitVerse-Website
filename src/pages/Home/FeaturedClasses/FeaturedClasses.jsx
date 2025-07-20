import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaStar, FaBox } from "react-icons/fa";

const fetchFeaturedClasses = async () => {
  const { data } = await axios.get("http://localhost:5000/featured-classes");
  return data;
};

const FeaturedClasses = () => {
  const { data: classes = [], isLoading, isError } = useQuery({
    queryKey: ["featured-classes"],
    queryFn: fetchFeaturedClasses,
  });

  if (isLoading) {
    return (
      <div className="h-[300px] flex justify-center items-center">
        <p className="text-xl font-semibold">Loading featured classes...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-[300px] flex justify-center items-center">
        <p className="text-xl font-semibold text-red-600">
          Failed to load featured classes!
        </p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-8">
          Featured <span className="text-black">Classes</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div
              key={cls._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              {/* Image with hover zoom */}
              <div className="overflow-hidden">
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="h-48 w-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Card Content */}
              <div className="p-5 text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {cls.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{cls.description}</p>

                {/* Rating and Booked Info */}
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-1 text-yellow-500 font-semibold">
                    <FaStar /> {cls.rating || "4.5"} Stars
                  </p>
                  <p className="flex items-center gap-1 text-blue-600 font-semibold">
                    <FaBox /> {cls.totalBookings || 0} Booked
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedClasses;

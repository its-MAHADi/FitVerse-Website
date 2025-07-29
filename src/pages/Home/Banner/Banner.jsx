import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

// TanStack Query দিয়ে ডেটা ফেচ
const fetchClasses = async () => {
  const { data } = await axios.get("https://fit-verse-server-nine.vercel.app/classes");
  return data;
};

const Banner = () => {
  const { data: classes = [], isLoading, isError } = useQuery({
    queryKey: ["classes"],
    queryFn: fetchClasses,
  });

  if (isLoading) {
    return (
      <div className="h-[400px] flex justify-center items-center">
        <p className="text-xl font-semibold">Loading banner...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-[400px] flex justify-center items-center">
        <p className="text-xl font-semibold text-red-600">
          Failed to load banner data!
        </p>
      </div>
    );
  }

  return (
    <div className="banner-container">
      <Carousel
        autoPlay ={true}
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        interval={3000}
        className="rounded-xl overflow-hidden"
      >
        {classes.slice(0, 8).map((cls) => (
          <div key={cls._id} className="relative">
            {/* Background Image */}
            <img
              src={cls.image}
              alt=""
              className="h-[400px] md:h-[500px] w-full object-cover"
            />

            {/* Overlay Text */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
              {/* <h2 className="text-3xl md:text-5xl text-white font-bold mb-4">
                {cls.title}
              </h2> */}
              <p className="text-white text-2xl font-semibold mb-5 max-w-xl">
                {cls.description}
              </p>
              <Link to="/all-classes">
                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800 transition">
                  Explore Classes
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;

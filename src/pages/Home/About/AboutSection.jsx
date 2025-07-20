import React from "react";
import aboutImage from "../../../assets/fitness gym.jpg"; 

const AboutSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={aboutImage}
            alt="About Fitness"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover hover:scale-105 transform transition duration-500"
          />
        </div>

        {/* Text Section */}
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            About <span className="text-blue-600">FitVerse</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            FitVerse is a next-generation fitness tracking platform built to 
            help you achieve your health and fitness goals. We combine cutting-edge 
            technology with expert guidance to create a personalized fitness journey 
            for everyone.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Whether you're looking to lose weight, build muscle, or simply stay 
            active, our community and tools are designed to motivate and support 
            you every step of the way.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

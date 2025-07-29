import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const trainers = [
  {
    id: 1,
    name: "Mahadi Hasan",
    expertise: "Strength Training",
    bio: "John has 10+ years of experience helping athletes achieve peak performance.",
    photo: "https://i.ibb.co/pvV3cKkj/mahadi.jpg",
  },
  {
    id: 2,
    name: "Jhankar Mahbub",
    expertise: "Yoga & Wellness",
    bio: "Emily is a certified yoga instructor specializing in mindfulness and flexibility.",
    photo: "https://i.ibb.co/DHNdMprV/jhankar.jpg",
  },
  {
    id: 3,
    name: "Nadir on The Go",
    expertise: "Cardio & HIIT",
    bio: "Michael’s HIIT sessions are designed to burn maximum calories in minimal time.",
    photo: "https://i.ibb.co/tMz5tYrn/nadiron.jpg",
  },
];

const TeamSection = () => {
  return (
    <section className="px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-8">
          Meet Our <span className="text-black">Trainers</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image with Hover Icons */}
              <div className="relative group">
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  className="w-full h-64 object-cover rounded-md"
                />

                {/* Social Icons inside the image */}
                <div className="absolute bottom-8 left-4 flex gap-3 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <a
                    href="#"
                    className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-800 transition"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="#"
                    className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-800 transition"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a
                    href="#"
                    className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-800 transition"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>

              {/* Trainer Info */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {trainer.name}
                </h3>
                <p className="text-blue-600 font-medium mt-1">
                  {trainer.expertise}
                </p>
                <p className="text-gray-600 text-sm mt-3">{trainer.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

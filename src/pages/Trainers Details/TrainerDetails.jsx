import React from "react";
import { useParams, Link, useNavigate } from "react-router"; 
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaArrowLeft, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import StickyNavbar from "../Shared/Navbar/StickyNavbar";

const fetchTrainerDetails = async (id) => {
  const { data } = await axios.get(`https://fit-verse-server-nine.vercel.app/trainers/${id}`);
  return data;
};

const TrainerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: trainer, isLoading, isError } = useQuery({
    queryKey: ["trainerDetails", id],
    queryFn: () => fetchTrainerDetails(id),
  });

  if (isLoading) {
    return <p className="text-center text-xl py-10">Loading trainer details...</p>;
  }

  if (isError || !trainer) {
    return (
      <p className="text-center text-xl text-red-600 py-10">
        Failed to load trainer details.
      </p>
    );
  }

  // Slot Click Handler with SweetAlert
  const handleSlotBooking = (slot) => {
    Swal.fire({
      title: "Confirm Booking?",
      text: `You selected: ${slot}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Book Now",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/trainer-booked/${trainer._id}?slot=${encodeURIComponent(slot)}&trainer=${encodeURIComponent(trainer.name)}`);
      }
    });
  };

  return (
    <div>
      <StickyNavbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/all-trainers"
            className="flex items-center gap-2 w-max px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            <FaArrowLeft className="text-lg" />
            Back to Trainers
          </Link>
        </div>

        {/* Trainer Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white shadow-md p-8 rounded-lg">
          {/* Trainer Image */}
          <div className="relative group">
            <img
              src={trainer.photo}
              alt={trainer.name}
              className="w-full h-[350px] object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
            />

            {/* Social Icons */}
            <div className="absolute bottom-4 left-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href={trainer.social?.facebook}
                target="_blank"
                rel="noreferrer"
                className="bg-white p-2 rounded-full shadow hover:bg-blue-600 hover:text-white transition"
              >
                <FaFacebook />
              </a>
              <a
                href={trainer.social?.linkedin}
                target="_blank"
                rel="noreferrer"
                className="bg-white p-2 rounded-full shadow hover:bg-blue-600 hover:text-white transition"
              >
                <FaLinkedin />
              </a>
              <a
                href={trainer.social?.instagram}
                target="_blank"
                rel="noreferrer"
                className="bg-white p-2 rounded-full shadow hover:bg-pink-600 hover:text-white transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Trainer Info Text */}
          <div>
            <div className="flex justify-between text-gray-700 font-medium mb-2">
              <span>
                Age: <span className="font-bold">{trainer.age}</span>
              </span>
              <span>
                Experience: <span className="font-bold">{trainer.experience} Years</span>
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{trainer.name}</h2>
            <p className="text-gray-600 mb-4">{trainer.details}</p>
            <p className="text-gray-800 font-medium mb-6">
              Expertise: <span className="text-blue-600">{trainer.expertise}</span>
            </p>
          </div>
        </div>

        {/* Available Slots */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Available Slots</h3>
          <div className="flex flex-wrap gap-3">
            {trainer.slots.map((slot, index) => (
              <button
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition"
                onClick={() => handleSlotBooking(slot)}
              >
                <MdDateRange /> {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Be A Trainer CTA */}
        <div className="mt-12 bg-gray-100 p-8 rounded-lg text-center shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Want to share your expertise?
          </h3>
          <Link
            to="/become-trainer"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-800 transition"
          >
            Become a Trainer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;

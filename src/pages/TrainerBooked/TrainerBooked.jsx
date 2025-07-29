import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import StickyNavbar from "../Shared/Navbar/StickyNavbar";
import UseAuth from "../../Hooks/UseAuth";
import axios from "axios";

const TrainerBooked = () => {
  const { user } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // URL থেকে slot এবং trainer নাম পড়া
  const queryParams = new URLSearchParams(location.search);
  const slot = queryParams.get("slot") || "Not Selected";
  const trainerId = location.pathname.split("/")[2]; // /trainer-booked/:id
  const trainerName = queryParams.get("trainer") || "Unknown Trainer";

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [trainerDetails, setTrainerDetails] = useState(null);

  const packages = [
    {
      name: "Basic Membership",
      price: "$10",
      benefits: [
        "Access to gym facilities during regular operating hours.",
        "Use of cardio and strength training equipment.",
      ],
    },
    {
      name: "Standard Membership",
      price: "$50",
      benefits: [
        "All benefits of the basic membership.",
        "Access to group fitness classes such as yoga, spinning, and Zumba.",
      ],
    },
    {
      name: "Premium Membership",
      price: "$100",
      benefits: [
        "All benefits of the standard membership.",
        "Access to personal training sessions with certified trainers.",
        "Use of additional amenities like a sauna or steam room.",
        "Discounts on additional services such as massage therapy or nutrition counseling.",
      ],
    },
  ];

  // Trainer info fetch
  useEffect(() => {
    if (trainerId) {
      axios
        .get(`https://fit-verse-server-nine.vercel.app/trainers/${trainerId}`)
        .then((res) => setTrainerDetails(res.data))
        .catch((err) => console.error("Error fetching trainer details:", err));
    }
  }, [trainerId]);

  const handleJoinNow = async () => {
    if (!selectedPlan) {
      Swal.fire({
        icon: "warning",
        title: "No Plan Selected",
        text: "Please select a membership plan first!",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    const selectedPackage = packages.find((pkg) => pkg.name === selectedPlan);
    const price = selectedPackage ? selectedPackage.price : null;

    // বুকিং ডেটা তৈরি (photo, experience, expertise যোগ করা হয়েছে)
    const bookingData = {
      trainerId,
      trainerName,
      trainerPhoto: trainerDetails?.photo || "",
      experience: trainerDetails?.experience || "N/A",
      expertise: trainerDetails?.expertise || "General Fitness",
      slot,
      plan: selectedPlan,
      price,
      userEmail: user?.email,
      userName: user?.displayName || "Anonymous",
      bookedAt: new Date(),
    };

    try {
      // বুকিং ডেটা DB তে add করবো
      await axios.post("https://fit-verse-server-nine.vercel.app/booked-trainers", bookingData);

      // তারপর আগের মতো পেমেন্ট পেজে যাবে
      Swal.fire({
        title: "Confirm Membership",
        text: `You have selected: ${selectedPlan}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#2563eb",
        cancelButtonColor: "#d33",
        confirmButtonText: "Proceed to Payment",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(
            `/create-payment-intent?plan=${encodeURIComponent(
              selectedPlan
            )}&slot=${encodeURIComponent(slot)}&trainer=${encodeURIComponent(
              trainerName
            )}&trainerId=${trainerId}`
          );
        }
      });
    } catch (error) {
      console.error("Booking error:", error);
    }
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

        {/* Trainer Details */}
        {trainerDetails && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8 text-center">
            <img
              src={trainerDetails.photo || "https://i.ibb.co/2KcrFGM/default-avatar.png"}
              alt={trainerName}
              className="w-28 h-28 mx-auto rounded-full border-2 border-blue-500 mb-4 object-cover"
            />
            <h2 className="text-3xl font-bold text-blue-600 mb-2">
              {trainerName}
            </h2>
            <p className="text-gray-700 text-lg mb-1">
              Selected Slot: <span className="font-semibold text-blue-500">{slot}</span>
            </p>
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">Experience:</span> {trainerDetails.experience} years
            </p>
           <p className="text-gray-700 text-sm">
          <span className="font-semibold">Expertise:</span>{" "}
         {trainerDetails.expertise &&
        (Array.isArray(trainerDetails.expertise)
      ? trainerDetails.expertise.join(", ")
      : trainerDetails.expertise)}
        </p>

          </div>
        )}

        {/* Packages */}
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Choose Your Membership Plan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`border rounded-xl shadow hover:shadow-lg p-6 transition cursor-pointer ${
                selectedPlan === pkg.name
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedPlan(pkg.name)}
            >
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {pkg.name}
              </h4>
              <p className="text-blue-600 font-bold text-lg mb-4">{pkg.price}</p>
              <ul className="text-gray-600 text-sm list-disc pl-5 space-y-1">
                {pkg.benefits.map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Join Now */}
        <div className="text-center mt-8">
          <button
            onClick={handleJoinNow}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-800 transition"
          >
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerBooked;

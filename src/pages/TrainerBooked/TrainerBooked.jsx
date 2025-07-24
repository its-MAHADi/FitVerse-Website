import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import StickyNavbar from "../Shared/Navbar/StickyNavbar";

const TrainerBooked = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // URL থেকে slot এবং trainer নাম পড়া
  const queryParams = new URLSearchParams(location.search);
  const slot = queryParams.get("slot") || "Not Selected";
  const trainerId = location.pathname.split("/")[2]; // /trainer-booked/:id
  const trainerName = queryParams.get("trainer") || "Unknown Trainer";

  const [selectedPlan, setSelectedPlan] = useState(null);

  const packages = [
    { name: "Basic Membership", price: "$10", benefits: ["Access to gym facilities during regular operating hours.", "Use of cardio and strength training equipment."] },
    { name: "Standard Membership", price: "$50", benefits: ["All benefits of the basic membership.", "Access to group fitness classes such as yoga, spinning, and Zumba."] },
    { name: "Premium Membership", price: "$100", benefits: ["All benefits of the standard membership.", "Access to personal training sessions with certified trainers.", "Use of additional amenities like a sauna or steam room.", "Discounts on additional services such as massage therapy or nutrition counseling."] }
  ];

  const handleJoinNow = () => {
    if (!selectedPlan) {
      Swal.fire({
        icon: "warning",
        title: "No Plan Selected",
        text: "Please select a membership plan first!",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

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
          `/create-payment-intent?plan=${encodeURIComponent(selectedPlan)}&slot=${encodeURIComponent(slot)}&trainer=${encodeURIComponent(trainerName)}&trainerId=${trainerId}`
        );
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

        {/* Header Info */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8 text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-2">
            Book Session with {trainerName}
          </h2>
          <p className="text-gray-700 text-lg">
            Selected Slot: <span className="font-semibold text-blue-500">{slot}</span>
          </p>
        </div>

        {/* Packages */}
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Choose Your Membership Plan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`border rounded-xl shadow hover:shadow-lg p-6 transition cursor-pointer ${
                selectedPlan === pkg.name ? "border-blue-600 bg-blue-50" : "border-gray-300"
              }`}
              onClick={() => setSelectedPlan(pkg.name)}
            >
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{pkg.name}</h4>
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

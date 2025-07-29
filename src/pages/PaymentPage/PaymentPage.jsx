import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import StickyNavbar from "../Shared/Navbar/StickyNavbar";

const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

// ------------------- Checkout Form -------------------
const CheckoutForm = ({ plan, slot, trainerName, trainerId, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios
      .post("https://fit-verse-server-nine.vercel.app/create-payment-intent", {
        price: price.replace("$", ""),
        trainerName,
        slot,
        plan,
      })
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => console.error("Payment intent error:", err));
  }, [price, plan, slot, trainerName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    const card = elements.getElement(CardElement);

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: error.message,
        });
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // 1. Save payment info
        await axios.post("https://fit-verse-server-nine.vercel.app/save-payment", {
          trainerName,
          slot,
          plan,
          price,
          paymentId: paymentIntent.id,
          date: new Date(),
        });

        // 2. Increase booking count
        await axios.patch(`https://fit-verse-server-nine.vercel.app/trainers/${trainerId}/bookings`);

        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: `Your payment of ${price} for ${plan} is completed.`,
          confirmButtonColor: "#2563eb",
        });

        navigate("/all-trainers");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: error.message || "Please try again!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Complete Your Payment</h3>
      <div className="text-gray-700 space-y-1">
        <p><span className="font-semibold">Trainer:</span> {trainerName}</p>
        <p><span className="font-semibold">Slot:</span> {slot}</p>
        <p><span className="font-semibold">Package:</span> {plan}</p>
        <p><span className="font-semibold">Price:</span> {price}</p>
      </div>

      <CardElement
        className="p-3 border rounded-md shadow-inner"
        options={{
          style: {
            base: { fontSize: "16px", color: "#424770", "::placeholder": { color: "#aab7c4" } },
            invalid: { color: "#9e2146" },
          },
        }}
      />

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-800 transition"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

// ------------------- Payment Page -------------------
const PaymentPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const plan = queryParams.get("plan");
  const slot = queryParams.get("slot");
  const trainerName = queryParams.get("trainer") || "Trainer Name Placeholder";
  const trainerId = queryParams.get("trainerId");

  const priceMap = {
    "Basic Membership": "$10",
    "Standard Membership": "$50",
    "Premium Membership": "$100",
  };
  const price = priceMap[plan] || "$0";

  if (!plan || !slot) {
    return (
      <div className="text-center text-xl py-20 text-gray-700">
        No payment data found.
        <div className="mt-4">
          <Link to="/all-trainers" className="text-blue-600 hover:underline">
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <StickyNavbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
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

        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Payment for {plan}
        </h2>

        <Elements stripe={stripePromise}>
          <CheckoutForm
            plan={plan}
            slot={slot}
            trainerName={trainerName}
            trainerId={trainerId}
            price={price}
          />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;

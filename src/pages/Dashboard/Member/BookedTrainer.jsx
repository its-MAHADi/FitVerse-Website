import { useEffect, useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import axios from "axios";
import Swal from "sweetalert2";

const BookedTrainer = () => {
  const { user } = UseAuth();
  const [bookedTrainer, setBookedTrainer] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch Booked Trainer Data
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/booked-trainers/${user.email}`)
        .then((res) => {
          setBookedTrainer(res.data);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, [user]);

  // Review Submit
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/reviews", {
        trainerId: selectedTrainer.trainerId,
        trainerName: selectedTrainer.trainerName,
        userEmail: user.email,
        rating,
        feedback: reviewText,
      });

      Swal.fire({
        icon: "success",
        title: "Review Submitted",
        text: "Thank you for your feedback!",
        timer: 2000,
        showConfirmButton: false,
      });

      setSelectedTrainer(null);
      setReviewText("");
      setRating(0);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to submit review.",
      });
    }
  };

  if (loading) return <p className="text-center text-lg py-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-8 bg-gray-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-5 text-center text-blue-600">
        Your Booked Trainers
      </h2>

      {bookedTrainer.length === 0 ? (
        <p className="text-center text-gray-500">No trainer booked yet.</p>
      ) : (
        <div className="space-y-6">
          {bookedTrainer.map((trainer) => (
            <div
              key={trainer._id}
              className="border border-gray-200 bg-white p-5 rounded-md shadow-md hover:shadow-lg transition"
            >
              {/* Trainer Info */}
              <div className="flex gap-5 items-center border-b pb-4 mb-4">
                <img
                  src={trainer.trainerPhoto || "https://i.ibb.co/2KcrFGM/default-avatar.png"}
                  alt={trainer.trainerName}
                  className="w-24 h-24 rounded-md object-cover border"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {trainer.trainerName}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Experience:</span> {trainer.experience || "N/A"} years
                  </p>
                 
                </div>
              </div>

              {/* Slot Info */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-700 mb-1">
                  Slot Information
                </h4>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Selected Slot:</span> {trainer.slot}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Plan:</span> {trainer.plan} ({trainer.price})
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Booked At:</span>{" "}
                  {new Date(trainer.bookedAt).toLocaleString()}
                </p>
              </div>

              {/* Classes Info */}
             <div className="mb-4">
               <h4 className="text-lg font-semibold text-gray-700 mb-1">
                   Expertise
                </h4>
              {trainer.expertise && trainer.expertise.length > 0 ? (
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
              {trainer.expertise.map((item, idx) => (
              <li key={idx}>{item}</li>
               ))}
               </ul>
               ) : (
             <p className="text-gray-500 text-sm">No expertise information available.</p>
              )}
           </div>

              {/* Other Info */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-700 mb-1">
                  Other Information
                </h4>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Booked By:</span>{" "}
                  {trainer.userName || "Anonymous"}
                </p>
                 <p className="text-gray-600 text-sm">
                <span className="font-medium">Email:</span>{" "}
                 {trainer.userEmail || "Not Available"}
                </p>
              </div>

              {/* Review Button */}
              <div className="text-right">
                <button
                  onClick={() => setSelectedTrainer(trainer)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition"
                >
                  Write Review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {selectedTrainer && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-3 text-center">
              Review {selectedTrainer.trainerName}
            </h2>

            <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
              {/* Rating */}
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer text-2xl ${
                      rating >= star ? "text-yellow-500" : "text-gray-400"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Feedback */}
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your feedback..."
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              ></textarea>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedTrainer(null)}
                  className="bg-gray-400 text-white px-4 py-1 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedTrainer;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const TrainerApplicationDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://fit-verse-server-nine.vercel.app/become-trainer/${id}`)
      .then((res) => setApplication(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const approveTrainer = async () => {
    try {
      await axios.patch(`https://fit-verse-server-nine.vercel.app/become-trainer/${id}/approve`);
      Swal.fire("Approved!", "Trainer application has been approved.", "success");
      navigate("/dashboard/admin/applied-trainer");
    } catch (err) {
      Swal.fire("Error!", "Failed to approve trainer.", "error");
    }
  };

  const rejectTrainer = async () => {
    const { value: message } = await Swal.fire({
      title: "Reject Trainer?",
      input: "textarea",
      inputPlaceholder: "Write your feedback here...",
      showCancelButton: true,
      confirmButtonText: "Reject",
      cancelButtonText: "Cancel",
    });

    if (!message) return;

    try {
      await axios.patch(`https://fit-verse-server-nine.vercel.app/become-trainer/${id}/reject`, { message });
      Swal.fire("Rejected!", "Trainer application has been rejected.", "info");
      navigate("/dashboard/admin/applied-trainer");
    } catch (err) {
      Swal.fire("Error!", "Failed to reject trainer.", "error");
    }
  };

  if (!application) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Trainer Application Details</h2>
      <div className="space-y-3">
        <p><strong>Name:</strong> {application.fullName}</p>
        <p><strong>Email:</strong> {application.email}</p>
        <p><strong>Status:</strong> {application.status}</p>
        <p><strong>Experience:</strong> {application.experience || "Not Provided"}</p>
        <p><strong>Applied On:</strong> {new Date(application.createdAt).toLocaleString()}</p>
      </div>
      <div className="mt-6 flex gap-4">
        <button
          onClick={approveTrainer}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Approve
        </button>
        <button
          onClick={rejectTrainer}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default TrainerApplicationDetails;

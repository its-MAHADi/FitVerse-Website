import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AllTrainersDashboard = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all trainers
  const fetchTrainers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/trainers");
      setTrainers(res.data);
    } catch (err) {
      console.error("Error fetching trainers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  // Remove trainer role
  const removeTrainer = async (email) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This trainer will be demoted to member.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.patch(`http://localhost:5000/users/${email}/role`, {
        role: "member",
      });
      setTrainers((prev) => prev.filter((t) => t.email !== email));

      Swal.fire("Success!", `${email} is now a member.`, "success");
    } catch (err) {
      Swal.fire("Error!", "Failed to remove trainer.", "error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading trainers...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">All Trainers</h2>
      {trainers.length === 0 ? (
        <p className="text-center text-gray-500">No trainers found.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">#</th>
              <th className="border p-2 text-left">Trainer</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer, i) => (
              <tr key={trainer.email}>
                <td className="border p-2">{i + 1}</td>
                <td className="border p-2 flex items-center gap-3">
                  <img
                    src={trainer.image || "/default-avatar.png"}
                    alt="trainer"
                    className="w-10 h-10 rounded-full border"
                  />
                  <div>
                    <p className="font-medium">{trainer.fullName || "Unnamed"}</p>
                    <p className="text-sm text-gray-500">
                      {trainer.role === "trainer" ? "Trainer" : "Member"}
                    </p>
                  </div>
                </td>
                <td className="border p-2">{trainer.email || "N/A"}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => removeTrainer(trainer.email)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                  >
                    Remove Trainer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllTrainersDashboard;

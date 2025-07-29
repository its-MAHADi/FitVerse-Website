import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const AppliedTrainers = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch applied trainers
  const fetchApplications = async () => {
    try {
      const res = await axios.get("https://fit-verse-server-nine.vercel.app/become-trainer");
      setApplications(res.data);
    } catch (error) {
      console.error("Error fetching trainer applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading applications...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Applied Trainers</h2>
      {applications.length === 0 ? (
        <p className="text-gray-500 text-center">No trainer applications found.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Applicant</th>
              <th className="border p-2">Email</th>
              <th className="border p-2 text-center">Status</th>
              <th className="border p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, i) => (
              <tr key={app._id} className="hover:bg-gray-50">
                <td className="border p-2">{i + 1}</td>
                <td className="border p-2 font-medium">{app.fullName}</td>
                <td className="border p-2">{app.email}</td>
                <td className="border p-2 text-center capitalize">
                  {app.status || "pending"}
                </td>
                <td className="border p-2 text-center">
                 <button
                   onClick={() => navigate(`/dashboard/admin/applied-trainer/${app._id}`)}
                   className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                   >
                  Details
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

export default AppliedTrainers;

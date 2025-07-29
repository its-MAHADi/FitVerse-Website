import { useEffect, useState } from "react";
import axios from "axios";
import { Eye } from "lucide-react";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";

const ActivityLog = () => {
  const { user } = UseAuth();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/become-trainer/${user.email}`)
        .then((res) => setApplications(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleViewMessage = (message) => {
    Swal.fire({
      icon: "info",
      title: "Admin Feedback",
      text: message || "No message provided.",
    });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Activity Log</h2>
      {applications.length === 0 ? (
        <p className="text-gray-500 text-center">No applications found.</p>
      ) : (
        <table className="w-full border border-gray-200 text-left shadow-md rounded-md">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-t hover:bg-gray-50">
                <td className="p-2">{app.fullName || "N/A"}</td>
                <td className="p-2">{app.email}</td>
                <td
                  className={`p-2 font-semibold ${
                    app.status === "pending" ? "text-yellow-600" : "text-red-500"
                  }`}
                >
                  {app.status}
                </td>
                <td className="p-2">
                  {app.status === "rejected" && (
                    <button
                      onClick={() => handleViewMessage(app.rejectionMessage)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ActivityLog;

import { useEffect, useState } from "react";
import axios from "axios";

const NewsletterSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/newsletter")
      .then((res) => setSubscribers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-5 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">All Newsletter Subscribers</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Subscribed At</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((s, i) => (
            <tr key={s._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{i + 1}</td>
              <td className="border px-4 py-2">{s.name || "N/A"}</td>
              <td className="border px-4 py-2">{s.email}</td>
              <td className="border px-4 py-2">
                {s.subscribedAt
                  ? new Date(s.subscribedAt).toLocaleString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewsletterSubscribers;

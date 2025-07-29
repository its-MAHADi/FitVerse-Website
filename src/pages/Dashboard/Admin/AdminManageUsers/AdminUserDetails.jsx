import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminUserDetails = () => {
  const { email } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`/admin/users/search?email=${email}`)
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, [email]);

  if (!user) return <p className="text-center py-10">User not found</p>;

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold">User Details</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>CreatedAt: {user.createdAt || "N/A"}</p>
    </div>
  );
};

export default AdminUserDetails;

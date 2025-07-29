import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UseAuth from "../../../../Hooks/UseAuth";

const AdminManageUsers = () => {
  const [users, setUsers] = useState([]);
   const { user, setUser } = UseAuth(); // Auth context থেকে বর্তমান ইউজার
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://fit-verse-server-nine.vercel.app/admin/users");
        setUsers(res.data);
        setFilteredUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Search filter
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((u) =>
        u.email.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [search, users]);

  const makeAdmin = async (email) => {
  try {
    await axios.patch(`https://fit-verse-server-nine.vercel.app/admin/users/${email}/make-admin`);
    setUsers((prev) =>
      prev.map((u) => (u.email === email ? { ...u, role: "admin" } : u))
    );

    Swal.fire({
      title: "Success!",
      text: `${email} is now an admin.`,
      icon: "success",
      confirmButtonText: "OK",
    });
  } catch (err) {
    Swal.fire({
      title: "Error!",
      text: "Failed to make admin.",
      icon: "error",
      confirmButtonText: "Try Again",
    });
  }
};

 const removeAdmin = async (email) => {
    try {
      const res = await axios.patch(`https://fit-verse-server-nine.vercel.app/admin/users/${email}/remove-admin`);
      if (res.data.success) {
        setUsers((prev) =>
          prev.map((u) => (u.email === email ? { ...u, role: "member" } : u))
        );

        Swal.fire({
          title: "Removed!",
          text: `${email} is no longer an admin.`,
          icon: "info",
          confirmButtonText: "OK",
        });

        // যদি বর্তমানে লগইন করা ইউজার হয়
        if (email === user?.email) {
          setUser({ ...user, role: "member" }); // Context update
          navigate("/dashboard/member/profile"); // Member dashboard এ redirect
        }
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Failed to remove admin.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };


  if (loading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search user by email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full rounded mb-4"
      />

      {/* User Table */}
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Role</th>
            <th className="border p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center p-4">
                No users found.
              </td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr key={user.email}>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2 text-center">
                  {user.role !== "admin" ? (
                    <button
                      onClick={() => makeAdmin(user.email)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => removeAdmin(user.email)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Remove Admin
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManageUsers;

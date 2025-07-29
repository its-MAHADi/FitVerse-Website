import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../firebase/firebase.init"; // IMPORT FIXED
import Swal from "sweetalert2";
import axios from "axios";
import UseAuth from "../../../Hooks/UseAuth";

const Profile = () => {
  const { user, setUser } = UseAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Firebase Profile Update
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });

      // 2. MongoDB Profile Update
      const res = await axios.patch(
        `https://fit-verse-server-nine.vercel.app/users/${user.email}`,
        { name, photoURL }
      );
      console.log("Mongo Update:", res.data);

      // 3. Local User Update (merge role)
      setUser({ ...auth.currentUser, role: user?.role });

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating your profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>

      <div className="flex flex-col items-center mb-6">
        <img
          src={user?.photoURL || "https://i.ibb.co/2KcrFGM/default-avatar.png"}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow"
        />
        <p className="text-lg font-semibold mt-3">{user?.displayName || "No Name"}</p>
        <p className="text-gray-500">{user?.email}</p>
        <p className="text-sm text-gray-400">
          Last Login: {user?.metadata?.lastSignInTime || "N/A"}
        </p>
      </div>

      {/* Update Form */}
      <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
        <div>
          <label className="block text-gray-600 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Profile Picture URL</label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter image URL"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-300"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;

import React, { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import axios from "axios";
import StickyNavbar from "../Shared/Navbar/StickyNavbar";
import UseAuth from "../../Hooks/UseAuth"; // AuthContext থেকে ইউজার ইমেইল নিচ্ছি

const BecomeTrainer = () => {
  const { user } = UseAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: user?.email || "",
    age: "",
    image: "",
    experience: "", // Experience যোগ করা হলো
    skills: [],
    availableDays: [],
    availableTime: "",
    otherInfo: "",
  });

  const daysOptions = [
    { value: "Sun", label: "Sunday" },
    { value: "Mon", label: "Monday" },
    { value: "Tue", label: "Tuesday" },
    { value: "Wed", label: "Wednesday" },
    { value: "Thu", label: "Thursday" },
    { value: "Fri", label: "Friday" },
    { value: "Sat", label: "Saturday" },
  ];

  const skillsList = ["Yoga", "Zumba", "Strength Training", "Cardio", "Pilates"];

  const handleSkillChange = (skill) => {
    setFormData((prev) => {
      const updatedSkills = prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills: updatedSkills };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trainerData = {
      ...formData,
      status: "pending", // ডিফল্ট status
    };

    try {
      const res = await axios.post("http://localhost:5000/become-trainer", trainerData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted",
          text: "Your trainer application is under review.",
          confirmButtonColor: "#2563eb",
        });
        setFormData({
          fullName: "",
          email: user?.email || "",
          age: "",
          image: "",
          experience: "",
          skills: [],
          availableDays: [],
          availableTime: "",
          otherInfo: "",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Something went wrong!",
      });
    }
  };

  return (
    <div>
      <StickyNavbar />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md my-10 px-3">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Apply to Become a Trainer
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full border p-3 rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              readOnly
              className="w-full border p-3 rounded-md bg-gray-100"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full border p-3 rounded-md"
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Experience (in years)</label>
            <input
              type="number"
              placeholder="e.g., 3"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full border p-3 rounded-md"
              required
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Profile Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full border p-3 rounded-md"
              required
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Skills</label>
            <div className="flex flex-wrap gap-3">
              {skillsList.map((skill) => (
                <label key={skill} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.skills.includes(skill)}
                    onChange={() => handleSkillChange(skill)}
                  />
                  {skill}
                </label>
              ))}
            </div>
          </div>

          {/* Available Days */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Available Days</label>
            <Select
              options={daysOptions}
              isMulti
              value={formData.availableDays}
              onChange={(selected) => setFormData({ ...formData, availableDays: selected })}
              className="w-full"
            />
          </div>

          {/* Available Time */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Available Time</label>
            <input
              type="text"
              placeholder="e.g., 10 AM - 5 PM"
              value={formData.availableTime}
              onChange={(e) => setFormData({ ...formData, availableTime: e.target.value })}
              className="w-full border p-3 rounded-md"
              required
            />
          </div>

          {/* Other Info */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Other Info</label>
            <textarea
              value={formData.otherInfo}
              onChange={(e) => setFormData({ ...formData, otherInfo: e.target.value })}
              className="w-full border p-3 rounded-md"
              rows="4"
            />
          </div>

          {/* Submit */}
          <div className="text-center py-3">
            <button
              type="submit"
              className="px-6 py-3 cursor-pointer bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-800 transition"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomeTrainer;

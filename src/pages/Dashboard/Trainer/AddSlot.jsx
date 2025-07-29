import React, { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import axios from "axios";
import UseAuth from "../../../Hooks/UseAuth";

const AddSlot = () => {
  const { user } = UseAuth();
  const [formData, setFormData] = useState({
    slotName: "",
    slotTime: "",
    days: [],
    classId: "",
  });

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/classes").then((res) => {
      setClasses(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.slotName || !formData.slotTime || !formData.days.length || !formData.classId) {
      return Swal.fire("Error", "All fields are required", "error");
    }

    try {
      const payload = {
        ...formData,
        trainerInfo: {
          email: user.email,
          name: user.displayName,
          _id: user._id,
        },
      };
      const res = await axios.post("http://localhost:5000/trainer/slots", payload);
      if (res.data.success) {
        Swal.fire("Success", "Slot added successfully!", "success");
        setFormData({ slotName: "", slotTime: "", days: [], classId: "" });
      }
    } catch (error) {
      Swal.fire("Error", "Failed to add slot", "error");
    }
  };

  const dayOptions = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">Add New Slot</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Slot Name</label>
          <input
            type="text"
            value={formData.slotName}
            onChange={(e) => setFormData({ ...formData, slotName: e.target.value })}
            placeholder="Morning Slot"
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Slot Time</label>
          <input
            type="text"
            value={formData.slotTime}
            onChange={(e) => setFormData({ ...formData, slotTime: e.target.value })}
            placeholder="1 hour"
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Select Days</label>
          <Select
            isMulti
            options={dayOptions}
            value={formData.days.map((d) => ({ value: d, label: d }))}
            onChange={(selected) => setFormData({ ...formData, days: selected.map((s) => s.value) })}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Class</label>
          <select
            value={formData.classId}
            onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Slot
        </button>
      </form>
    </div>
  );
};

export default AddSlot;

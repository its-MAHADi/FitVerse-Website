import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UseAuth from "../../../Hooks/UseAuth";

const ManageSlots = () => {
  const { user } = UseAuth();
  const [slots, setSlots] = useState([]);

  const fetchSlots = () => {
    axios.get(`http://localhost:5000/trainer/slots/${user.email}`).then((res) => {
      setSlots(res.data);
    });
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/trainer/slots/${id}`);
        fetchSlots();
        Swal.fire("Deleted!", "Slot has been deleted.", "success");
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Manage Slots</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Slot Name</th>
            <th className="p-2">Time</th>
            <th className="p-2">Days</th>
            <th className="p-2">Booked By</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => (
            <tr key={slot._id} className="border-t">
              <td className="p-2">{slot.slotName}</td>
              <td className="p-2">{slot.slotTime}</td>
              <td className="p-2">{slot.days.join(", ")}</td>
              <td className="p-2">{slot.trainerName || "Not Booked"}</td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(slot._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageSlots;

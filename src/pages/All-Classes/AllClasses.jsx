import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";

const AllClasses = () => {
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(""); // search state
  const limit = 6;

  // Fetch Classes
  const fetchClasses = () => {
    axios
      .get(
        `http://localhost:5000/all-classes?page=${currentPage}&limit=${limit}&search=${search}`
      )
      .then((res) => {
        setClasses(res.data.classes);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error("Error fetching classes:", err));
  };

  useEffect(() => {
    fetchClasses();
  }, [currentPage, search]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 py-7">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">
          All Classes
        </h2>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by class name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Classes List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div
              key={cls._id}
              className="bg-white border rounded-lg shadow hover:shadow-lg overflow-hidden"
            >
              {/* Class Image */}
              <img
                src={cls.image}
                alt={cls.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {cls.name}
                </h3>
                <p className="text-gray-600 mb-4">{cls.description}</p>

                {/* Trainers */}
                <h4 className="font-medium text-gray-700 mb-2">Trainers:</h4>
                <div className="flex gap-3">
                  {cls.trainers?.slice(0, 5).map((trainer) => (
                    <div key={trainer.id} className="relative group">
                      <Link
                        to={`/trainer/${trainer.id}`}
                        className="block w-12 h-12 rounded-full overflow-hidden border hover:scale-105 transition"
                      >
                        <img
                          src={trainer.image}
                          alt={trainer.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      {/* Trainer Name on hover */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-800 opacity-0 group-hover:opacity-100 transition">
                        {trainer.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-3 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Prev
          </button>
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num + 1}
              onClick={() => handlePageChange(num + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === num + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {num + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllClasses;

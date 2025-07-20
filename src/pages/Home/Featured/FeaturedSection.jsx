import React from "react";
import {FaDumbbell,FaUsers,FaChartLine,FaHeartbeat,FaRunning,FaAppleAlt,} from "react-icons/fa";

const FeaturedSection = () => {
  const features = [
    {
      id: 1,
      icon: <FaDumbbell className="text-4xl text-blue-600" />,
      title: "Personal Training",
      description:
        "Expert trainers create personalized workout plans tailored for your goals.",
    },
    {
      id: 2,
      icon: <FaUsers className="text-4xl text-green-600" />,
      title: "Community Support",
      description:
        "Stay motivated with a supportive and vibrant fitness community.",
    },
    {
      id: 3,
      icon: <FaChartLine className="text-4xl text-purple-600" />,
      title: "Progress Tracking",
      description:
        "Track your workout performance with interactive charts and stats.",
    },
    {
      id: 4,
      icon: <FaHeartbeat className="text-4xl text-red-600" />,
      title: "Health Monitoring",
      description:
        "Monitor your heart rate, BMI, and other health metrics seamlessly.",
    },
    {
      id: 5,
      icon: <FaRunning className="text-4xl text-orange-600" />,
      title: "Group Classes",
      description:
        "Join Yoga, Zumba, or HIIT sessions to improve your stamina and flexibility.",
    },
    {
      id: 6,
      icon: <FaAppleAlt className="text-4xl text-pink-600" />,
      title: "Nutrition Plans",
      description:
        "Get customized diet and nutrition plans designed by professionals.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
          Our <span className="text-blue-600">Key Features</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;

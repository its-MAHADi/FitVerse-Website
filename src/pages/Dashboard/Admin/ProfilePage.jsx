import { Card } from "@material-tailwind/react";


const ProfilePage = ({ user }) => {
  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <img
              src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="User"
              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md mb-4"
            />
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>

          <div className="mt-6 space-y-3">
            <p><strong>Phone:</strong> {user?.phone || "Not added"}</p>
            <p><strong>Address:</strong> {user?.address || "Not added"}</p>
            <p><strong>Role:</strong> {user?.role || "User"}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;

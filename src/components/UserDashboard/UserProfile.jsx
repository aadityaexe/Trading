import React, { useState } from "react";

export default function UserProfile({ user, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    image: user.image,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onUpdate(form);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-900 border border-yellow-600 p-5 rounded-lg flex flex-col sm:flex-row gap-6 items-center sm:items-start">
      {/* Profile Picture */}
      <div className="flex flex-col items-center sm:items-start">
        <img
          src={form.image || "https://via.placeholder.com/100"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-2 border-yellow-600 object-cover"
        />
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="mt-3 bg-yellow-500 text-black font-semibold px-4 py-1 rounded hover:bg-yellow-400 transition-colors"
          >
            Edit Info
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(false)}
            className="mt-3 bg-gray-700 text-yellow-400 font-semibold px-4 py-1 rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Info Section */}
      {!isEditing ? (
        <div className="w-full space-y-2 text-center sm:text-left">
          <h2 className="text-lg font-semibold text-yellow-400">{user.name}</h2>
          <p className="text-sm text-gray-300">{user.email}</p>
          <p className="text-sm text-gray-300">{user.phone}</p>
          <div className="text-sm mt-3 text-gray-400">
            Plan: <span className="text-yellow-400 font-bold">{user.plan}</span>
          </div>
          <div className="text-sm text-gray-400">
            Joined:{" "}
            <span className="text-yellow-400 font-bold">{user.joinDate}</span>
          </div>
        </div>
      ) : (
        <div className="w-full grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-400">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="bg-black border border-yellow-600 p-2 rounded text-yellow-400"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-400">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="bg-black border border-yellow-600 p-2 rounded text-yellow-400"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-400">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="bg-black border border-yellow-600 p-2 rounded text-yellow-400"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-400">Profile Image URL</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="bg-black border border-yellow-600 p-2 rounded text-yellow-400"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="sm:col-span-2 mt-3 bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

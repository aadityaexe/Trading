// src/lib/adminData.js
// Mock Database Simulation for Admin Dashboard
// You can later replace this with a real API or connect it to a JSON server.

const STORAGE_KEY = "mock_users";

// Default users (only used on first run)
const DEFAULT_USERS = [
  {
    id: 1,
    name: "Aditya Choudhary",
    email: "aditya@dev.com",
    plan: "Gold",
    amount: 500,
    approved: true,
    joinedAt: "2025-10-01",
  },
  {
    id: 2,
    name: "Priyatosh Singh",
    email: "priya@code.com",
    plan: "Silver",
    amount: 250,
    approved: false,
    joinedAt: "2025-10-12",
  },
  {
    id: 3,
    name: "Riya Patel",
    email: "riya@web.com",
    plan: "Platinum",
    amount: 1200,
    approved: true,
    joinedAt: "2025-10-05",
  },
];

// Initialize mock DB if empty
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
}

// Utility function to fetch all users
export function getAllUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

// Add a new user
export function addUser(user) {
  const users = getAllUsers();
  const id = Date.now();
  const newUser = { id, ...user };
  users.push(newUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return newUser;
}

// Approve or reject user
export function updateUser(id, updates) {
  const users = getAllUsers().map((u) =>
    u.id === id ? { ...u, ...updates } : u
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return users;
}

// Delete user
export function deleteUser(id) {
  const users = getAllUsers().filter((u) => u.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  return users;
}

// Reset database (optional helper)
export function resetMockDB() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
}

// Example usage
// const users = getAllUsers()
// updateUser(1, { approved: false })
// deleteUser(3)

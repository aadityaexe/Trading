let user = {
  id: 1,
  name: "Aditya",
  email: "aditya@example.com",
  phone: "+91 9999999999",
  image: "https://via.placeholder.com/80",
  amount: 5000,
  approved: true,
  plan: "Pro",
  joinDate: "2024-06-01",
  transactions: [],
};

export const getUserData = () => user;

export const updateUser = (updates) => {
  user = { ...user, ...updates };
  return user;
};

export const addTransaction = (type, amount) => {
  const date = new Date().toLocaleDateString();
  user.transactions.unshift({ type, amount, date });

  user.amount = type === "add" ? user.amount + amount : user.amount - amount;

  return user;
};

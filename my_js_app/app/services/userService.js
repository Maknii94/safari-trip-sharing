// This layer abstracts the business logic and data access operations.
const users = ["Omar"]; // In a real app, this would be replaced by database operations.

exports.getAllUsers = async () => {
  // Business logic can be added here
  return users;
};

exports.getUserById = async (id) => {
  return users.find(user => user.id === id);
};

exports.createUser = async (userData) => {
  const newUser = { id: users.length + 1, ...userData };
  users.push(newUser);
  return newUser;
};

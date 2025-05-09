import users from '../data/users.js';

export const getAllUsers = (req, res) => {
  res.json(users);
};

export const getUserById = (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  user ? res.json(user) : res.status(404).json({ message: 'User not found' });
};

export const createUser = (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: Date.now().toString(), name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};

export const updateUser = (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.name = req.body.name ?? user.name;
  user.email = req.body.email ?? user.email;
  res.json(user);
};

export const deleteUser = (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  users.splice(index, 1);
  res.json({ message: 'User deleted' });
};

import users from '../data/users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key'; // put in .env in real projects

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
};

export const logout = (req, res) => {
  // For JWT, logout is handled client-side (e.g. delete token)
  res.json({ message: 'Logout successful (client should discard token)' });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'Email already registered' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword
  };
  users.push(newUser);
  res.status(201).json({ message: 'User registered' });
};

export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.password = await bcrypt.hash(newPassword, 10);
  res.json({ message: 'Password reset successful' });
};

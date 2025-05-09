import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key'; // In production, store in .env

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Expect: Bearer <token>

  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });

    req.user = user;
    next();
  });
};

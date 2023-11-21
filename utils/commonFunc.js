import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (user) => {
  const secretKey = process.env.JWT_SECRET; // Set your secret key

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, secretKey);
};

export const sanitizeUser = (user) => {
  return {
    id: user._id,
    role: user.role,
    email: user.email,
  };
};

export const authenticateToken = (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'User not authorized !!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.token=token;
    next();
  } catch (error) {
    console.error('Error decoding token:', error);
    res
      .status(401)
      .json({ msg: 'User not authorized / Wrong Token Provided !!' });
  }
};

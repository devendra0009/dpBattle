import User from '../model/User.js';
import bcrypt from 'bcrypt';
import { generateToken, sanitizeUser } from '../utils/commonFunc.js';
import getDataUri from '../utils/fileUri.js';
import cloudinary from 'cloudinary';

export const registerUser = async (req, res) => {
  try {
    const userData = req.body;
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser)
      return res.status(409).json({ msg: 'User already Exists!' });

    // image upload to cloudinary
    const file = req.file;
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
      folder: 'dpImageDb',
    });
    userData.img = myCloud.secure_url;

    // hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create a new user
    const newUser = new User({
      ...userData,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate a token for the newly registered user
    const sendUser = sanitizeUser(savedUser);
    const token = generateToken(sendUser);

    // Respond with the token and any additional user data if needed
    res.status(201).json({ token, user: sendUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    // const isPasswordValid = await bcrypt.compare(password, user.password);

    // if (!isPasswordValid) {
    //   return res.status(401).json({ msg: 'Invalid email or password' });
    // }

    // Generate a token for the authenticated user
    const sendUser = sanitizeUser(user);
    // console.log(sendUser);
    const token = generateToken(sendUser);

    // Respond with the token and any additional user data if needed
    res.status(200).json({ token, user: sendUser });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const checkAuthentication = (req, res) => {
  res.status(200).json({ token: req.token });
};

export const logoutUser = async (req, res) => {
  res.status(200).json({ msg: 'User logged out successfully' });
};

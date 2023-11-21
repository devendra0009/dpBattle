import express from 'express';
import {
  checkAuthentication,
  loginUser,
  logoutUser,
  registerUser,
} from '../controller/authController.js';
import { authenticateToken } from '../utils/commonFunc.js';
import singleUploadMulter from '../middleware/singleUploadMulter.js';
const router = express.Router();

router
  .post('/register', singleUploadMulter , registerUser)
  .post('/login', loginUser)
  .post('/logout', logoutUser)
  .get('/check', authenticateToken, checkAuthentication);

export default router;

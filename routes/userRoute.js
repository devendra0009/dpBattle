import express from 'express';
import { deleteUserByUserId, getAllUsers, getUserByContestId, getUserByUserEmail, getUserByUserId, updateFollowerFollowingByUserId, updateUserByUserId } from '../controller/userController.js';
const router = express.Router();

router
  .get('/getAllUsers', getAllUsers)
  .get('/getUserByUserEmail', getUserByUserEmail)
  .get('/getUserByUserId', getUserByUserId)
  .get('/getUserByContestId',getUserByContestId)
  .patch('/updateUserByUserId', updateUserByUserId)
  .patch('/updateFollowerFollowingByUserId',updateFollowerFollowingByUserId)
  .delete('/deleteUserByUserId',deleteUserByUserId)

export default router;
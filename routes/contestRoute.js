import express from 'express';
import {
  createContest,
  createContestWithFriend,
  deleteContestByContestId,
  deleteContestByUserId,
  getAllContests,
  getContestByContestId,
  getContestByUserId,
  joinContest,
  updateContest,
} from '../controller/contestController.js';
import singleUploadMulter from '../middleware/singleUploadMulter.js';
import mulitpleUploadMulter from '../middleware/multipleUploadMulter.js';
const router = express.Router();

router
  .get('/getAllContests', getAllContests)
  .get('/getContestByContestId/:id', getContestByContestId)
  .get('/getContestByUserId', getContestByUserId)
  .post('/createContest',singleUploadMulter, createContest)
  .post('/createContestWithFriend', mulitpleUploadMulter,createContestWithFriend)
  .patch('/joinContest/:id', singleUploadMulter,joinContest)
  .patch('/updateContest', updateContest) // if contest is active but date is expired so update
  // .delete('/deleteContestByContestId', deleteContestByContestId); // this can be done by Admin only
  .delete('/deleteContestByContestId', deleteContestByContestId)
  .delete('/deleteContestByUserId', deleteContestByUserId); 

export default router;

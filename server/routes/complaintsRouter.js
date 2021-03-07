import express from 'express';

import {getComplaintsByUserId, getComplaints, createComplaint, updateComplaint} from '../controllers/complaintsController.js';

const router = express.Router();
import {authenticate, authorizeRole} from "../middleware/auth.js";

//Base Url is: https://<domain>/complaints
router.get('/', getComplaints);
router.get('/:id',authenticate, getComplaintsByUserId);
router.post('/', authenticate, createComplaint);
router.patch('/update/:id', authenticate, updateComplaint);

export default router;

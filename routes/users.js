import express from 'express';
import { testUser, getUser, updateUser } from '../controllers/user.js';

const router = express.Router();

router.get('/test', testUser);
router.get('/find/:userId', getUser);
router.put('/', updateUser);

export default router;

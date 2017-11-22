import mongoose from 'mongoose';
import express from 'express';
import repoCtrl from '../controllers/repo.controller';

const router = express.Router();

router.route('/').get(repoCtrl.load)

export default router;

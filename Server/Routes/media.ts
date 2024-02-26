import express from 'express';
import { DisplayPostList } from '../Controllers/media';
const router = express.Router();

router.get('/', (req, res, next)=>{DisplayPostList(req, res, next);});






export default router;
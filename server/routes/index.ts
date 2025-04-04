import express from 'express';
import { checkMongoDBConnection, registerSeller } from '../controllers/seller.controller';

const router = express.Router();

// ...existing routes...
router.get('/api/mongodb-status', checkMongoDBConnection);
router.post('/api/seller-registration', registerSeller);

export default router;

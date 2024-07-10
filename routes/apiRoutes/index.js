import express from 'express';
import animalRoutes from './animalRoutes.js';
import zookeeperRoutes from './zookeeperRoutes.js';

// Create router instance
const router = express.Router();

router.use(animalRoutes);
router.use(zookeeperRoutes);

// export router instance's defined routes
export default router;
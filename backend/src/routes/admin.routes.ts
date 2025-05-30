import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { isAdmin } from '../middleware/auth.middleware.js';

const router = Router();
const adminController = new AdminController();

// Get all monitored users (admin only)
router.get('/monitored-users', isAdmin, adminController.getMonitoredUsers);

// Get activity for a specific user (admin only)
router.get('/user-activity/:userId', isAdmin, adminController.getUserActivity);

export default router; 
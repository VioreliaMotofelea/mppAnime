import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AdminController {
  async getMonitoredUsers(req: Request, res: Response) {
    try {
      const monitoredUsers = await prisma.monitoredUser.findMany({
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              role: true
            }
          }
        }
      });

      res.json(monitoredUsers);
    } catch (error) {
      console.error('Error fetching monitored users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUserActivity(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { startDate, endDate } = req.query;

      const where = {
        userId: parseInt(userId),
        ...(startDate && endDate ? {
          timestamp: {
            gte: new Date(startDate as string),
            lte: new Date(endDate as string)
          }
        } : {})
      };

      const activity = await prisma.activityLog.findMany({
        where,
        orderBy: {
          timestamp: 'desc'
        }
      });

      res.json(activity);
    } catch (error) {
      console.error('Error fetching user activity:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
} 
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const activityLogger = async (req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send;
  res.send = function (body) {
    res.locals.body = body;
    return originalSend.call(this, body);
  };

  next();

  // Log the activity after the response is sent
  res.on('finish', async () => {
    try {
      const userId = req.user?.id;
      if (!userId) return;

      const method = req.method;
      const path = req.path;
      const entity = path.split('/')[1]; // e.g., /anime/1 -> anime
      const entityId = parseInt(path.split('/')[2]) || 0;

      let action: string;
      switch (method) {
        case 'POST':
          action = 'CREATE';
          break;
        case 'GET':
          action = 'READ';
          break;
        case 'PUT':
        case 'PATCH':
          action = 'UPDATE';
          break;
        case 'DELETE':
          action = 'DELETE';
          break;
        default:
          return;
      }

      await prisma.activityLog.create({
        data: {
          userId,
          action,
          entity,
          entityId,
          timestamp: new Date()
        }
      });
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  });
}; 
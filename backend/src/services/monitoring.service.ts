import { PrismaClient } from '@prisma/client';
import { CronJob } from 'cron';

const prisma = new PrismaClient();

// Thresholds for suspicious activity
const THRESHOLDS = {
  CREATE: 50, // operations per hour
  UPDATE: 30,
  DELETE: 10,
  READ: 100
};

export class MonitoringService {
  private job: CronJob;

  constructor() {
    // Run every hour
    this.job = new CronJob('0 * * * *', () => {
      this.checkUserActivity();
    });
  }

  public start(): void {
    this.job.start();
  }

  public stop(): void {
    this.job.stop();
  }

  private async checkUserActivity(): Promise<void> {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    // Get all users
    const users = await prisma.user.findMany();

    for (const user of users) {
      // Get user's activity in the last hour
      const recentActivity = await prisma.activityLog.findMany({
        where: {
          userId: user.id,
          timestamp: {
            gte: oneHourAgo
          }
        }
      });

      // Count operations by type
      const operationCounts = recentActivity.reduce((acc, log) => {
        acc[log.action] = (acc[log.action] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Check if any operation exceeds thresholds
      const suspiciousOperations = Object.entries(operationCounts)
        .filter(([action, count]) => count > THRESHOLDS[action as keyof typeof THRESHOLDS])
        .map(([action, count]) => `${action}: ${count}`);

      if (suspiciousOperations.length > 0) {
        // Add or update monitored user
        await prisma.monitoredUser.upsert({
          where: { userId: user.id },
          update: {
            reason: `Suspicious activity detected: ${suspiciousOperations.join(', ')}`,
            lastCheckedAt: new Date()
          },
          create: {
            userId: user.id,
            reason: `Suspicious activity detected: ${suspiciousOperations.join(', ')}`
          }
        });

        // Update user's isMonitored flag
        await prisma.user.update({
          where: { id: user.id },
          data: { isMonitored: true }
        });
      }
    }
  }
} 
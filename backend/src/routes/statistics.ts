import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

interface Anime {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  episodes: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Review {
  id: number;
  content: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  animeId: number;
}

interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface EnhancedAnime extends Anime {
  reviewCount: number;
  averageRating: number;
  _count: {
    reviews: number;
  };
  reviews: Pick<Review, 'rating'>[];
}

interface EnhancedUser {
  id: number;
  username: string;
  reviewCount: number;
  averageRating: number;
}

// Get top rated animes with review statistics
router.get('/top-rated', async (req, res) => {
  try {
    const topAnimes = await prisma.anime.findMany({
      take: 10,
      orderBy: {
        rating: 'desc',
      },
      include: {
        _count: {
          select: {
            reviews: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });

    const enhancedAnimes = topAnimes.map((anime: EnhancedAnime) => ({
      ...anime,
      reviewCount: anime._count.reviews,
      averageRating: anime.reviews.reduce((acc: number, review: Pick<Review, 'rating'>) => acc + review.rating, 0) / anime.reviews.length || 0,
    }));

    res.json(enhancedAnimes);
  } catch (error) {
    console.error('Error fetching top rated animes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get anime statistics by status
router.get('/by-status', async (req, res) => {
  try {
    const stats = await prisma.anime.groupBy({
      by: ['status'],
      _count: {
        id: true,
      },
      _avg: {
        rating: true,
      },
    });

    res.json(stats);
  } catch (error) {
    console.error('Error fetching anime statistics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user review statistics
router.get('/user-stats', async (req, res) => {
  try {
    const userStats = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        _count: {
          select: {
            reviews: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      orderBy: {
        reviews: {
          _count: 'desc',
        },
      },
      take: 10,
    });

    const enhancedStats = userStats.map((user: User & { _count: { reviews: number }, reviews: Pick<Review, 'rating'>[] }) => ({
      id: user.id,
      username: user.username,
      reviewCount: user._count.reviews,
      averageRating: user.reviews.reduce((acc: number, review: Pick<Review, 'rating'>) => acc + review.rating, 0) / user.reviews.length || 0,
    }));

    res.json(enhancedStats);
  } catch (error) {
    console.error('Error fetching user statistics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 
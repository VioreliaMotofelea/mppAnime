import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Anime } from '../entities/Anime';
import { Review } from '../entities/Review';
import { Episode } from '../entities/Episode';

export class AnimeController {
  async getStats(req: Request, res: Response) {
    try {
      const animeRepo = AppDataSource.getRepository(Anime);
      const reviewRepo = AppDataSource.getRepository(Review);
      const episodeRepo = AppDataSource.getRepository(Episode);

      // Get top rated animes with their review counts
      const topRatedAnimes = await animeRepo
        .createQueryBuilder('anime')
        .leftJoinAndSelect('anime.reviews', 'review')
        .select([
          'anime.id',
          'anime.title',
          'anime.rating',
          'COUNT(review.id) as reviewCount'
        ])
        .groupBy('anime.id')
        .orderBy('anime.rating', 'DESC')
        .limit(10)
        .getRawMany();

      // Get genre distribution
      const genreStats = await animeRepo
        .createQueryBuilder('anime')
        .select('unnest(anime.genres) as genre')
        .addSelect('COUNT(*)', 'count')
        .groupBy('genre')
        .orderBy('count', 'DESC')
        .getRawMany();

      // Get yearly anime count
      const yearlyStats = await animeRepo
        .createQueryBuilder('anime')
        .select('anime.releaseYear', 'year')
        .addSelect('COUNT(*)', 'count')
        .groupBy('anime.releaseYear')
        .orderBy('anime.releaseYear', 'DESC')
        .getRawMany();

      // Get average episodes per anime
      const episodeStats = await episodeRepo
        .createQueryBuilder('episode')
        .select('anime.id', 'animeId')
        .addSelect('anime.title', 'title')
        .addSelect('COUNT(episode.id)', 'episodeCount')
        .innerJoin('episode.anime', 'anime')
        .groupBy('anime.id')
        .orderBy('episodeCount', 'DESC')
        .limit(10)
        .getRawMany();

      res.json({
        topRatedAnimes,
        genreStats,
        yearlyStats,
        episodeStats
      });
    } catch (error) {
      console.error('Error fetching anime statistics:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
} 
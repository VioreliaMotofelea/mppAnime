import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import { Anime } from './entities/Anime';
import { Episode } from './entities/Episode';
import { Like } from 'typeorm';
import animeRoutes from './routes/animeRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use('/api/animes', animeRoutes); // Removed to avoid route conflict

// Initialize TypeORM
AppDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');

  // Basic route
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Anime API' });
  });

  // CRUD for Anime
  app.get('/api/animes', async (req, res) => {
    const { title, sortBy = 'id', order = 'ASC', page = 1, limit = 20 } = req.query;
    const animeRepo = AppDataSource.getRepository(Anime);
    const where = title ? { title: Like(`%${title}%`) } : {};
    const take = Number(limit) || 20;
    const skip = (Number(page) - 1) * take;
    const [animes, total] = await animeRepo.findAndCount({
      where,
      order: { [sortBy as string]: order as 'ASC' | 'DESC' },
      skip,
      take,
      relations: ['episodes'],
    });
    res.json({ animes, total, page: Number(page), limit: take });
  });

  /*p.get('/api/animes/:id', async (req, res) => {
    const animeRepo = AppDataSource.getRepository(Anime);
    const anime = await animeRepo.findOne({
      where: { id: Number(req.params.id) },
      relations: ['episodes'],
    });
    if (!anime) return res.status(404).json({ message: 'Anime not found' });
    res.json(anime);
  });*/

  // Get top rated animes
  app.get('/api/animes/top-rated', async (req, res) => {
    const animeRepo = AppDataSource.getRepository(Anime);
    // Adjust the query as needed for your schema
    const animes = await animeRepo.find({
      order: { rating: 'DESC' },
      take: 10
    });
    res.json(animes);
  });

  app.get('/api/animes/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid anime ID" });
    }
    const animeRepo = AppDataSource.getRepository(Anime);
    const anime = await animeRepo.findOne({
      where: { id },
      relations: ['episodes'],
    });
    if (!anime) return res.status(404).json({ message: 'Anime not found' });
    res.json(anime);
  });

  app.post('/api/animes', async (req, res) => {
    const animeRepo = AppDataSource.getRepository(Anime);
    const anime = animeRepo.create(req.body);
    await animeRepo.save(anime);
    res.status(201).json(anime);
  });

  app.put('/api/animes/:id', async (req, res) => {
    const animeRepo = AppDataSource.getRepository(Anime);
    await animeRepo.update(req.params.id, req.body);
    const updated = await animeRepo.findOne({ where: { id: Number(req.params.id) } });
    res.json(updated);
  });

  app.delete('/api/animes/:id', async (req, res) => {
    const animeRepo = AppDataSource.getRepository(Anime);
    await animeRepo.delete(req.params.id);
    res.status(204).send();
  });

  // CRUD for Episode
  app.get('/api/episodes', async (req, res) => {
    const { animeId, sortBy = 'id', order = 'ASC' } = req.query;
    const episodeRepo = AppDataSource.getRepository(Episode);
    const where = animeId ? { anime: { id: Number(animeId) } } : {};
    const episodes = await episodeRepo.find({
      where,
      order: { [sortBy as string]: order as 'ASC' | 'DESC' },
      relations: ['anime'],
    });
    res.json(episodes);
  });

  app.get('/api/episodes/:id', async (req, res) => {
    const episodeRepo = AppDataSource.getRepository(Episode);
    const episode = await episodeRepo.findOne({
      where: { id: Number(req.params.id) },
      relations: ['anime'],
    });
    if (!episode) return res.status(404).json({ message: 'Episode not found' });
    res.json(episode);
  });

  app.post('/api/episodes', async (req, res) => {
    const episodeRepo = AppDataSource.getRepository(Episode);
    const episode = episodeRepo.create(req.body);
    await episodeRepo.save(episode);
    res.status(201).json(episode);
  });

  app.put('/api/episodes/:id', async (req, res) => {
    const episodeRepo = AppDataSource.getRepository(Episode);
    await episodeRepo.update(req.params.id, req.body);
    const updated = await episodeRepo.findOne({ where: { id: Number(req.params.id) } });
    res.json(updated);
  });

  app.delete('/api/episodes/:id', async (req, res) => {
    const episodeRepo = AppDataSource.getRepository(Episode);
    await episodeRepo.delete(req.params.id);
    res.status(204).send();
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

}).catch((error: any) => console.error('Error during Data Source initialization', error)); 
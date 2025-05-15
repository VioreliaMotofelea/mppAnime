import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Episode } from "../entities/Episode";

const router = Router();

// Get all episodes with filtering and sorting
router.get("/", async (req, res) => {
  const episodeRepo = AppDataSource.getRepository(Episode);
  const { animeId, sortBy = "id", order = "ASC" } = req.query;
  const where: any = {};
  if (animeId) where.anime = { id: Number(animeId) };
  const episodes = await episodeRepo.find({
    where,
    order: { [String(sortBy)]: order === "DESC" ? "DESC" : "ASC" },
    relations: ["anime"],
  });
  res.json(episodes);
});

// Get episode by id
router.get("/:id", async (req, res) => {
  const episodeRepo = AppDataSource.getRepository(Episode);
  const episode = await episodeRepo.findOne({ where: { id: Number(req.params.id) }, relations: ["anime"] });
  if (!episode) return res.status(404).json({ message: "Episode not found" });
  res.json(episode);
});

// Create episode
router.post("/", async (req, res) => {
  const episodeRepo = AppDataSource.getRepository(Episode);
  const episode = episodeRepo.create(req.body);
  await episodeRepo.save(episode);
  res.status(201).json(episode);
});

// Update episode
router.put("/:id", async (req, res) => {
  const episodeRepo = AppDataSource.getRepository(Episode);
  let episode = await episodeRepo.findOne({ where: { id: Number(req.params.id) } });
  if (!episode) return res.status(404).json({ message: "Episode not found" });
  episodeRepo.merge(episode, req.body);
  await episodeRepo.save(episode);
  res.json(episode);
});

// Delete episode
router.delete("/:id", async (req, res) => {
  const episodeRepo = AppDataSource.getRepository(Episode);
  const result = await episodeRepo.delete(req.params.id);
  if (result.affected === 0) return res.status(404).json({ message: "Episode not found" });
  res.json({ message: "Episode deleted" });
});

export default router; 
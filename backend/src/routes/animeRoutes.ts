import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Anime } from "../entities/Anime";

const router = Router();

// Get all animes with filtering and sorting
router.get("/", async (req, res) => {
  const animeRepo = AppDataSource.getRepository(Anime);
  const { title, status, sortBy = "id", order = "ASC" } = req.query;
  const where: any = {};
  if (title) where.title = title;
  if (status) where.status = status;
  const animes = await animeRepo.find({
    where,
    order: { [String(sortBy)]: order === "DESC" ? "DESC" : "ASC" },
  });
  res.json(animes);
});

// Get anime by id
router.get("/:id", async (req, res) => {
  const animeRepo = AppDataSource.getRepository(Anime);
  const anime = await animeRepo.findOne({ where: { id: Number(req.params.id) } });
  if (!anime) return res.status(404).json({ message: "Anime not found" });
  res.json(anime);
});

// Create anime
router.post("/", async (req, res) => {
  const animeRepo = AppDataSource.getRepository(Anime);
  const anime = animeRepo.create(req.body);
  await animeRepo.save(anime);
  res.status(201).json(anime);
});

// Update anime
router.put("/:id", async (req, res) => {
  const animeRepo = AppDataSource.getRepository(Anime);
  let anime = await animeRepo.findOne({ where: { id: Number(req.params.id) } });
  if (!anime) return res.status(404).json({ message: "Anime not found" });
  animeRepo.merge(anime, req.body);
  await animeRepo.save(anime);
  res.json(anime);
});

// Delete anime
router.delete("/:id", async (req, res) => {
  const animeRepo = AppDataSource.getRepository(Anime);
  const result = await animeRepo.delete(req.params.id);
  if (result.affected === 0) return res.status(404).json({ message: "Anime not found" });
  res.json({ message: "Anime deleted" });
});

export default router;

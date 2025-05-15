import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Review } from "../entities/Review";

const router = Router();

// Get all reviews with filtering and sorting
router.get("/", async (req, res) => {
  const reviewRepo = AppDataSource.getRepository(Review);
  const { userId, animeId, sortBy = "id", order = "ASC" } = req.query;
  const where: any = {};
  if (userId) where.user = { id: Number(userId) };
  if (animeId) where.anime = { id: Number(animeId) };
  const reviews = await reviewRepo.find({
    where,
    order: { [String(sortBy)]: order === "DESC" ? "DESC" : "ASC" },
    relations: ["user", "anime"],
  });
  res.json(reviews);
});

// Get review by id
router.get("/:id", async (req, res) => {
  const reviewRepo = AppDataSource.getRepository(Review);
  const review = await reviewRepo.findOne({ where: { id: Number(req.params.id) }, relations: ["user", "anime"] });
  if (!review) return res.status(404).json({ message: "Review not found" });
  res.json(review);
});

// Create review
router.post("/", async (req, res) => {
  const reviewRepo = AppDataSource.getRepository(Review);
  const review = reviewRepo.create(req.body);
  await reviewRepo.save(review);
  res.status(201).json(review);
});

// Update review
router.put("/:id", async (req, res) => {
  const reviewRepo = AppDataSource.getRepository(Review);
  let review = await reviewRepo.findOne({ where: { id: Number(req.params.id) } });
  if (!review) return res.status(404).json({ message: "Review not found" });
  reviewRepo.merge(review, req.body);
  await reviewRepo.save(review);
  res.json(review);
});

// Delete review
router.delete("/:id", async (req, res) => {
  const reviewRepo = AppDataSource.getRepository(Review);
  const result = await reviewRepo.delete(req.params.id);
  if (result.affected === 0) return res.status(404).json({ message: "Review not found" });
  res.json({ message: "Review deleted" });
});

export default router; 
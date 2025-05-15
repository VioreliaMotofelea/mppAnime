import { Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const router = Router();

// Get all users with filtering and sorting
router.get("/", async (req, res) => {
  const userRepo = AppDataSource.getRepository(User);
  const { username, sortBy = "id", order = "ASC" } = req.query;
  const where: any = {};
  if (username) where.username = username;
  const users = await userRepo.find({
    where,
    order: { [String(sortBy)]: order === "DESC" ? "DESC" : "ASC" },
    relations: ["animes", "reviews", "posts"],
  });
  res.json(users);
});

// Get user by id
router.get("/:id", async (req, res) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({ where: { id: Number(req.params.id) }, relations: ["animes", "reviews", "posts"] });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// Create user
router.post("/", async (req, res) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.create(req.body);
  await userRepo.save(user);
  res.status(201).json(user);
});

// Update user
router.put("/:id", async (req, res) => {
  const userRepo = AppDataSource.getRepository(User);
  let user = await userRepo.findOne({ where: { id: Number(req.params.id) } });
  if (!user) return res.status(404).json({ message: "User not found" });
  userRepo.merge(user, req.body);
  await userRepo.save(user);
  res.json(user);
});

// Delete user
router.delete("/:id", async (req, res) => {
  const userRepo = AppDataSource.getRepository(User);
  const result = await userRepo.delete(req.params.id);
  if (result.affected === 0) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted" });
});

export default router; 
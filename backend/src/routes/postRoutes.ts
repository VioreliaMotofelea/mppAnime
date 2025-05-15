import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Post } from "../entities/Post";

const router = Router();

// Get all posts with filtering and sorting
router.get("/", async (req, res) => {
  const postRepo = AppDataSource.getRepository(Post);
  const { userId, sortBy = "id", order = "ASC" } = req.query;
  const where: any = {};
  if (userId) where.user = { id: Number(userId) };
  const posts = await postRepo.find({
    where,
    order: { [String(sortBy)]: order === "DESC" ? "DESC" : "ASC" },
    relations: ["user"],
  });
  res.json(posts);
});

// Get post by id
router.get("/:id", async (req, res) => {
  const postRepo = AppDataSource.getRepository(Post);
  const post = await postRepo.findOne({ where: { id: Number(req.params.id) }, relations: ["user"] });
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// Create post
router.post("/", async (req, res) => {
  const postRepo = AppDataSource.getRepository(Post);
  const post = postRepo.create(req.body);
  await postRepo.save(post);
  res.status(201).json(post);
});

// Update post
router.put("/:id", async (req, res) => {
  const postRepo = AppDataSource.getRepository(Post);
  let post = await postRepo.findOne({ where: { id: Number(req.params.id) } });
  if (!post) return res.status(404).json({ message: "Post not found" });
  postRepo.merge(post, req.body);
  await postRepo.save(post);
  res.json(post);
});

// Delete post
router.delete("/:id", async (req, res) => {
  const postRepo = AppDataSource.getRepository(Post);
  const result = await postRepo.delete(req.params.id);
  if (result.affected === 0) return res.status(404).json({ message: "Post not found" });
  res.json({ message: "Post deleted" });
});

export default router; 
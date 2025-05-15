import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export const getUsers = async (req: Request, res: Response) => {
  const { name, sortBy = "id", order = "ASC" } = req.query;
  const userRepo = AppDataSource.getRepository(User);

  const users = await userRepo.find({
    where: name ? { username: String(name) } : {},
    order: { [String(sortBy)]: order === "DESC" ? "DESC" : "ASC" },
    relations: ["posts"],
  });

  res.json(users);
};

// Implement createUser, updateUser, deleteUser similarly
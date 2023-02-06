import { Router } from "express";

import { loginController } from "../controllers/LoginController";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser
} from "../controllers/UserController";
import { Authentication } from "../middlewares/authentication";

export const routes = Router();

routes.post("/login", loginController);

routes.use(Authentication);

routes.get("/users", getUsers);
routes.get("/users/:id", getUser);
routes.post("/users", createUser);
routes.patch("/users/:id", updateUser);
routes.delete("/users/:id", deleteUser);

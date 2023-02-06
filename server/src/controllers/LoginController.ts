import 'dotenv/config';
import { Response } from "express";
import { sign } from "jsonwebtoken";
import { ILogin } from "../Types";

export async function loginController(request: ILogin, response: Response) {
  const { username, password } = request.body;

  if (username !== "leocarlos-dias" || password !== "123") {
    return response
      .status(401)
      .json({ message: "Usuário e/ou senha incorreta(s)." });
  }

  const token = sign({ username }, process.env.SECRET_KEY, {
    subject: "1",
  });

  return response.status(200).json({ token });
}

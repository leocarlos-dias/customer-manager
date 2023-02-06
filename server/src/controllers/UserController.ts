import { Request, Response } from "express";
import { User } from "../models/UserSchema";
import { ICreateUser, IGetUser, IUpdateUser } from "../Types";

export async function getUser(request: IGetUser, response: Response) {
  const { id } = request.params;

  if (id !== "1") {
    return response.status(404).json({ response: "Usuário não encontrado!" });
  }

  return response.status(200).json({
    id: "1",
    username: "leocarlos-dias",
    password: "123",
  });
}

export async function getUsers(request: Request, response: Response) {
  const users = await User.find();

  return response.status(200).json(users);
}

export async function createUser(request: ICreateUser, response: Response) {
  const { name, email, phone, address, cpf: oldCpf } = request.body;

  const PHONE_REGEX = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
  const CPF_REGEX = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2})$/;

  if (!CPF_REGEX.test(oldCpf)) {
    return response.status(400).json({ response: "CPF inválido!" });
  }

  if (!PHONE_REGEX.test(phone)) {
    return response
      .status(400)
      .json({ response: "Número de telefone inválido!" });
  }
  const cpf = oldCpf.replace(/[^0-9]/g, "");

  const emailAlreadyExists = await User.findOne({ email: email });
  if (emailAlreadyExists) {
    return response.status(409).json({ response: "Usuário já cadastrado!" });
  }

  const cpflAlreadyExists = await User.findOne({ cpf: cpf });
  if (cpflAlreadyExists) {
    return response.status(409).json({ response: "Usuário já cadastrado!" });
  }

  const newUser = await User.create({
    name,
    email,
    phone,
    address,
    cpf,
  });

  return response.status(201).json(newUser);
}

export async function updateUser(request: IUpdateUser, response: Response) {
  const { id } = request.params;
  const { name, email, phone, address, cpf: oldCpf } = request.body;

  const PHONE_REGEX = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
  const CPF_REGEX = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2})$/;

  if (!CPF_REGEX.test(oldCpf)) {
    return response.status(400).json({ response: "CPF inválido!" });
  }

  if (!PHONE_REGEX.test(phone)) {
    return response
      .status(400)
      .json({ response: "Número de telefone inválido!" });
  }

  const cpf = oldCpf.replace(/[^0-9]/g, "");

  const emailAlreadyExists = await User.findOne({ email: email });
  if (emailAlreadyExists) {
    if (emailAlreadyExists.id !== id) {
      return response.status(409).json({ response: "Usuário já cadastrado!" });
    }
  }

  const cpflAlreadyExists = await User.findOne({ cpf: cpf });
  if (cpflAlreadyExists) {
    if (cpflAlreadyExists.id !== id) {
      return response.status(409).json({ response: "Usuário já cadastrado!" });
    }
  }

  const updateUser = await User.findOneAndUpdate(
    { _id: id },
    { name, email, phone, address, cpf },
    { new: true }
  );

  if (!updateUser) {
    return response.status(404).json({ response: "Usuário não encontrado!" });
  }

  return response
    .status(200)
    .json({ response: "Usuário atualizado com sucesso!" });
}

export async function deleteUser(request: Request, response: Response) {
  const { id } = request.params;

  const user = await User.findByIdAndDelete({ _id: id });

  if (!user) {
    return response.status(404).json({ response: "Usuário não encontrado" });
  }

  return response
    .status(200)
    .json({ response: "Usuário deletado com sucesso." });
}

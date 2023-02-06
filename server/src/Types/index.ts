import { Request } from "express";

export interface ILogin extends Request {
  body: {
    username: string;
    password: string;
  };
}

export interface IGetUser extends Request {
  body: {
    id: string;
  };
}

export interface ICreateUser extends Request {
  body: {
    name: string;
    email: string;
    phone: string;
    address: string;
    cpf: string;
  };
}

export interface IUpdateUser extends Request {
  body: {
    name: string;
    email: string;
    phone: string;
    address: string;
    cpf: string;
  };
  params: {
    id: string;
  };
}

export interface IDeleteUser extends Request {
  params: {
    id: string;
  };
}

export interface IAuthentication extends Request {
  headers: {
    authorization: string;
  };
}

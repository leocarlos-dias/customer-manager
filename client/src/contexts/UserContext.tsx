import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ICreateCustomer,
  ICustomer,
  IDeleteCustomer,
  IFormCreateCustomer,
  IFormUpdateCustomer,
  IUpdateCustomer,
} from "../interfaces/customers";
import {
  IFormLogin,
  IJwtDecode,
  IRequestUser,
  IUser,
  IUserContext,
} from "../interfaces/user";
import { requestMyAPI } from "../services/api";

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [customers, setCustomers] = useState<ICustomer[] | null>(null);
  const [waitRequest, setWaitRequest] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const token =
        localStorage.getItem("access_token") ||
        sessionStorage.getItem("access_token");

      if (!token) {
        setWaitRequest(false);
        setUser(null);
        return;
      }

      try {
        setWaitRequest(true);

        const { sub: idDecoded } = jwtDecode<IJwtDecode>(token);

        const { data } = await requestMyAPI.get<IRequestUser>(
          `/users/${idDecoded}`,
          {
            headers: { authorization: "Bearer " + token },
          }
        );

        const userFound: IUser = {
          id: data.id,
          username: data.username,
        };

        getCustumers();
        setUser(userFound);
      } catch {
        toast.error("Usuário não tem permissão");
      } finally {
        setWaitRequest(false);
      }
    })();
  }, []);

  async function getCustumers() {
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");

    if (!token) {
      setWaitRequest(false);
      return;
    }

    try {
      setWaitRequest(true);
      const { data } = await requestMyAPI.get<ICustomer[]>("users", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setCustomers(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.response);
        } else {
          toast.error("Erro no servidor, tente novamente mais tarde!");
        }
      }
    } finally {
      setWaitRequest(false);
    }
  }

  async function userLogin({ username, password, remember }: IFormLogin) {
    try {
      setWaitRequest(true);

      const { data } = await requestMyAPI.post("/login", {
        username,
        password,
      });

      const { username: decodedUsername, sub: decodedId } =
        jwtDecode<IJwtDecode>(data.token);

      if (!decodedId) {
        return;
      }

      setUser({ username: decodedUsername, id: decodedId });

      if (!remember) {
        sessionStorage.setItem("access_token", data.token);
      } else {
        localStorage.setItem("access_token", data.token);
      }

      getCustumers();

      toast.success(`Olá, ${decodedUsername}!`);

      const toNavigate = location.state?.from?.pathname || "/customers";
      navigate(toNavigate, { replace: false });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          toast.error("Usuário e/ou senha inválido(s)");
        } else {
          toast.error("Erro no servidor, tente novamente mais tarde!");
        }
      }
    } finally {
      setWaitRequest(false);
    }
  }

  function userLogout() {
    toast(`Até breve, ${user?.username}!`, { icon: "👋" });

    localStorage.removeItem("access_token");
    sessionStorage.removeItem("access_token");
    setUser(null);

    navigate("/login", { replace: true });
  }

  async function createCustomer(formValues: IFormCreateCustomer) {
    delete formValues.zipcode;

    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");

    if (!token) {
      setWaitRequest(false);
      return;
    }

    const formattedCpf = formValues.cpf.replace(/[^0-9]/g, "");

    try {
      setWaitRequest(true);
      const { data } = await requestMyAPI.post<ICreateCustomer>(
        "users",
        { ...formValues, cpf: formattedCpf },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success(`O cliente ${data.name} foi cadastrado com sucesso.`);
      getCustumers();
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.response);
        } else {
          toast.error("Erro no servidor, tente novamente mais tarde!");
        }
      }
      return false;
    } finally {
      setWaitRequest(false);
    }
  }

  async function updateCustomer(formValues: IFormUpdateCustomer) {
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");

    if (!token) {
      setWaitRequest(false);
      return;
    }

    const formattedCpf = formValues.cpf.replace(/[^0-9]/g, "");

    try {
      setWaitRequest(true);
      await requestMyAPI.patch<IUpdateCustomer>(
        "users/" + formValues._id,
        { ...formValues, formattedCpf },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success(`O cliente foi atualizado com sucesso.`);
      getCustumers();
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.response);
        } else {
          toast.error("Erro no servidor, tente novamente mais tarde!");
        }
      }
      return false;
    } finally {
      setWaitRequest(false);
    }
  }

  async function deleteCustomer(id: string) {
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");

    if (!token) {
      setWaitRequest(false);
      return;
    }

    try {
      setWaitRequest(true);
      const { data } = await requestMyAPI.delete<IDeleteCustomer>(
        "users/" + id,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success(data.response);
      getCustumers();
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.response);
        } else {
          toast.error("Erro no servidor, tente novamente mais tarde!");
        }
      }
      return false;
    } finally {
      setWaitRequest(false);
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        userLogin,
        userLogout,
        customers,
        waitRequest,
        setWaitRequest,
        createCustomer,
        updateCustomer,
        deleteCustomer,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

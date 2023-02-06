import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdAlternateEmail, MdPassword } from "react-icons/md";
import ReactLoading from "react-loading";
import { Link, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import image from "../../assets/energia-solar.png";
import { UserContext } from "../../contexts/UserContext";
import { IFormLogin } from "../../interfaces/user";
import { loginUserSchema } from "./schema";

interface IFormValues extends IFormLogin {}

export const Login = () => {
  const { userLogin, waitRequest } = useContext(UserContext);
  const [isLogged, setIsLogged] = useState(true);
  const { register, handleSubmit } = useForm<IFormValues>({
    mode: "onBlur",
    resolver: yupResolver(loginUserSchema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");

    if (token) {
      navigate("/home", { replace: false });
    }

    setIsLogged(false);
  }, [navigate]);

  if (isLogged) {
    return (
      <ReactLoading type="cylon" color="#111827" height={100} width={100} />
    );
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="mx-auto flex w-full max-w-sm overflow-hidden rounded-lg bg-white px-2 shadow-lg lg:max-w-4xl">
        <div
          className="relative hidden overflow-hidden rounded-l-md bg-cover lg:block lg:w-1/2"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div
            className="relative flex h-full w-full flex-col items-start justify-center gap-4 px-8 
                                        before:absolute before:left-0 before:h-full before:w-full before:bg-gray-900 before:opacity-50 before:content-['']"
          ></div>
        </div>
        <form
          onSubmit={handleSubmit(userLogin)}
          className="w-full p-4 md:p-8 lg:w-1/2"
        >
          <h2 className="text-center text-2xl font-semibold text-gray-700">
            Energy
          </h2>
          <p className="text-center text-xl text-gray-600">
            Bem vindo de volta!
          </p>
          <Link
            to="#"
            className="mt-4 flex items-center justify-center rounded-lg text-white shadow-md hover:bg-gray-100 active:translate-y-[1px]"
          >
            <div className="px-4 py-3">
              <svg
                className="h-6 w-6"
                viewBox="0 0 40 40"
                data-icon="google"
                role="img"
              >
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>
            <h1 className="w-5/6 whitespace-nowrap px-4 py-3 text-center font-bold text-gray-600">
              Entrar com o Google
            </h1>
          </Link>
          <Link
            to="#"
            className="mt-4 flex items-center justify-center rounded-lg bg-[#24292F] text-white shadow-md hover:bg-[#24292F]/90 active:translate-y-[1px]"
          >
            <div className="px-4 py-3">
              <svg
                className="h-6 w-6"
                data-icon="github"
                role="img"
                viewBox="0 0 496 512"
              >
                <path
                  fill="currentColor"
                  d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                ></path>
              </svg>
            </div>
            <h1 className="w-5/6 whitespace-nowrap px-4 py-3 text-center font-bold text-gray-100">
              Entrar com o Github
            </h1>
          </Link>
          <div className="mt-4 flex items-center justify-between">
            <span className="w-1/5 border-b lg:w-1/4"></span>
            <Link
              to="#"
              className="whitespace-nowrap text-center text-xs uppercase text-gray-500"
            >
              ou logar com seu email
            </Link>
            <span className="w-1/5 border-b lg:w-1/4"></span>
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Nome do usuário
            </label>
            <div className="flex">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-700 bg-gray-700 px-3 text-sm text-white">
                <MdAlternateEmail />
              </span>
              <input
                className="focus:shadow-outline block w-full appearance-none rounded-r-md border border-gray-300 bg-gray-200 py-2 px-4 text-gray-700 focus:outline-none"
                type="text"
                {...register("username")}
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Senha
              </label>
              <Link to="#" className="text-xs text-gray-500">
                Esqueceu a senha?
              </Link>
            </div>
            <div className="flex">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-700 bg-gray-700 px-3 text-sm text-white">
                <MdPassword />
              </span>
              <input
                className="focus:shadow-outline block w-full appearance-none rounded-r-md border border-gray-300 bg-gray-200 py-2 px-4 text-gray-700 focus:outline-none"
                type="password"
                {...register("password")}
              />
            </div>
            <div className="mt-4 flex items-center justify-start gap-2">
              <input type="checkbox" {...register("remember")} />
              <label htmlFor="remember" className="text-base text-gray-500">
                Lembrar de mim
              </label>
            </div>
          </div>
          <div className="mt-8">
            <button
              disabled={waitRequest}
              className="w-full rounded bg-gray-700 py-2 px-4 font-bold text-white hover:bg-gray-600 active:translate-y-[1px]"
            >
              {waitRequest ? <BeatLoader color="#fff" size={10} /> : "Entrar"}
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="w-1/5 border-b md:w-1/4"></span>
            <Link to="#" className="text-xs uppercase text-gray-500">
              ou cadastre-se
            </Link>
            <span className="w-1/5 border-b md:w-1/4"></span>
          </div>
        </form>
      </div>
    </div>
  );
};

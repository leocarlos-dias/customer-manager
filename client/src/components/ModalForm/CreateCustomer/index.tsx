import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import BeatLoader from "react-spinners/BeatLoader";
import { UserContext } from "../../../contexts/UserContext";
import { IFormCreateCustomer } from "../../../interfaces/customers";
import { createCustomerSchema } from "./schema";

interface IZipcode {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export const ModalCreateCostumer = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { createCustomer, waitRequest } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormCreateCustomer>({
    mode: "onBlur",
    resolver: yupResolver(createCustomerSchema),
  });

  async function handleZipcode(zipcode: string) {
    try {
      const { data } = await axios.get<IZipcode>(
        `https://viacep.com.br/ws/${zipcode}/json/`
      );
      const { logradouro, bairro, localidade, uf, cep } = data;

      const address = `${logradouro}, ${bairro} - ${localidade}/${uf} - CEP-${cep}`;
      setValue("address", address);
    } catch (error) {
      toast.error("CEP não encontrado!");
    }
  }

  async function handleSubmitModal(formValues: IFormCreateCustomer) {
    const response = await createCustomer(formValues);

    if (response) {
      handleCloseModal();
    }
  }

  return (
    <div className="px-6 py-6 lg:px-8">
      <h3 className="mb-4 text-xl font-medium text-gray-100 ">
        Cadastrar cliente
      </h3>
      <form onSubmit={handleSubmit(handleSubmitModal)}>
        <div className="space-y-2 py-1">
          <h3 className=" text-gray-100">Dados Pessoais</h3>
          <hr />
          <div className=" py-1">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-100 "
            >
              Nome
            </label>
            <input
              disabled={waitRequest}
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 px-3 text-sm text-gray-800 focus:border-blue-500 focus:ring-blue-500    "
              {...register("name")}
            />
            <ErrorMessage
              render={({ message }) => (
                <p className="mt-1 text-xs text-red-500">{message}</p>
              )}
              errors={errors}
              name="name"
            />
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex-1 py-1">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-100 "
              >
                Email
              </label>
              <input
                disabled={waitRequest}
                type="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 px-3 text-sm text-gray-800 focus:border-blue-500 focus:ring-blue-500    "
                {...register("email")}
              />
              <ErrorMessage
                render={({ message }) => (
                  <p className="mt-1 text-xs text-red-500">{message}</p>
                )}
                errors={errors}
                name="email"
              />
            </div>
            <div className="py-1 md:w-1/3">
              <label
                htmlFor="CPF"
                className="mb-2 block text-sm font-medium text-gray-100 "
              >
                CPF
              </label>
              <input
                disabled={waitRequest}
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 px-3 text-sm text-gray-800 focus:border-blue-500 focus:ring-blue-500    "
                {...register("cpf")}
              />
              <ErrorMessage
                render={({ message }) => (
                  <p className="mt-1 text-xs text-red-500">{message}</p>
                )}
                errors={errors}
                name="cpf"
              />
            </div>
          </div>
        </div>
        <div className="space-y-2 py-3">
          <h3 className=" text-gray-100">Contato</h3>
          <hr />
          <div className=" py-1">
            <label
              htmlFor="zipcode"
              className="mb-2 block text-sm font-medium text-gray-100 "
            >
              CEP
            </label>
            <input
              disabled={waitRequest}
              onBlurCapture={(event) =>
                handleZipcode(event.currentTarget.value)
              }
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 px-3 text-sm text-gray-800 focus:border-blue-500 focus:ring-blue-500    "
              {...register("zipcode")}
            />
            <ErrorMessage
              render={({ message }) => (
                <p className="mt-1 text-xs text-red-500">{message}</p>
              )}
              errors={errors}
              name="zipcode"
            />
          </div>
          <div className=" py-1">
            <label
              htmlFor="zipcode"
              className="mb-2 block text-sm font-medium text-gray-100 "
            >
              Endereço
            </label>
            <input
              disabled={waitRequest}
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 px-3 text-sm text-gray-800 focus:border-blue-500 focus:ring-blue-500    "
              {...register("address")}
            />
            <ErrorMessage
              render={({ message }) => (
                <p className="mt-1 text-xs text-red-500">{message}</p>
              )}
              errors={errors}
              name="address"
            />
          </div>
          <div className=" py-1">
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-gray-100 "
            >
              Telefone
            </label>
            <input
              disabled={waitRequest}
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 px-3 text-sm text-gray-800 focus:border-blue-500 focus:ring-blue-500    "
              {...register("phone")}
            />
            <ErrorMessage
              render={({ message }) => (
                <p className="mt-1 text-xs text-red-500">{message}</p>
              )}
              errors={errors}
              name="phone"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 pt-2">
          <button
            disabled={waitRequest}
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 "
          >
            {waitRequest ? <BeatLoader color="#fff" size={10} /> : "Cadastrar"}
          </button>
          <button
            disabled={waitRequest}
            onClick={handleCloseModal}
            className="w-full rounded-lg bg-gray-100/60 px-5 py-2.5 text-center text-sm font-medium text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

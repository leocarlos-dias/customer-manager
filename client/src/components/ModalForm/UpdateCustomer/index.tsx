import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import BeatLoader from "react-spinners/BeatLoader";
import { UserContext } from "../../../contexts/UserContext";
import { ICustomer } from "../../../interfaces/customers";
import { updateCustomerSchema } from "./schema";

interface IModalUpdateCustomer extends ICustomer {
  handleCloseModal: () => void;
}

export const ModalUpdateCustomer = ({
  _id,
  cpf,
  name,
  phone,
  email,
  address,
  handleCloseModal,
}: IModalUpdateCustomer) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IModalUpdateCustomer>({
    mode: "onBlur",
    resolver: yupResolver(updateCustomerSchema),
    defaultValues: {
      _id,
      name,
      cpf,
      email,
      phone,
      address,
    },
  });
  const { updateCustomer, waitRequest } = useContext(UserContext);

  async function handleSubmitModal(formValues: IModalUpdateCustomer) {
    const response = await updateCustomer(formValues);

    if (response) {
      handleCloseModal();
    }
  }

  return (
    <div className="px-6 py-6 lg:px-8">
      <h3 className="mb-4 text-xl font-medium text-gray-100 ">
        Editar cliente
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
              {...register("name")}
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 px-3 text-sm text-gray-800 focus:border-blue-500 focus:ring-blue-500    "
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
                {...register("email")}
                type="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 px-3 text-sm text-gray-800 focus:border-blue-500 focus:ring-blue-500    "
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
                {...register("cpf")}
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 px-3 text-sm text-gray-800 focus:border-blue-500 focus:ring-blue-500    "
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
              htmlFor="address"
              className="mb-2 block text-sm font-medium text-gray-100 "
            >
              Endereço
            </label>
            <input
              disabled={waitRequest}
              {...register("address")}
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 px-3 text-sm text-gray-800 focus:border-blue-500 focus:ring-blue-500    "
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
              {...register("phone")}
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 px-3 text-sm text-gray-800 focus:border-blue-500 focus:ring-blue-500    "
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
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 "
          >
            {waitRequest ? <BeatLoader color="#fff" size={10} /> : "Editar"}
          </button>
          <button
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

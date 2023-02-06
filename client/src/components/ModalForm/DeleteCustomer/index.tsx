import { useContext } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { UserContext } from "../../../contexts/UserContext";

export const ModalDeleteCustomer = ({
  _id,
  handleCloseModal,
}: {
  _id: string;
  handleCloseModal: () => void;
}) => {
  const { deleteCustomer, waitRequest } = useContext(UserContext);

  async function handleSubmitModal(formValue: string) {
    const response = await deleteCustomer(formValue);

    if (response) {
      handleCloseModal();
    }
  }

  return (
    <div className=" px-6 py-6 lg:px-8">
      <h3 className="mb-4 text-xl font-medium text-gray-100 ">
        Excluir cliente
      </h3>
      <div className="flex flex-col items-center justify-start gap-4 pt-2">
        <h2 className="text-lg text-gray-100">
          Você tem certeza que deseja excluir este cliente?
        </h2>
        <div className="flex w-full items-center gap-4 pt-2">
          <button
            disabled={waitRequest}
            onClick={() => handleSubmitModal(_id)}
            className="w-full rounded-lg bg-gray-100/60 px-5 py-2.5 text-center text-sm font-medium text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            {waitRequest ? <BeatLoader color="#fff" size={10} /> : "Deletar"}
          </button>
          <button
            disabled={waitRequest}
            onClick={handleCloseModal}
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 "
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

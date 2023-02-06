import { useContext, useEffect, useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { SiMicrosoftexcel } from "react-icons/si";
import { CustomerRow } from "../../components/CustomerRow";
import { Emoji } from "../../components/Emoji";
import { Modal } from "../../components/Modal";
import { ModalCreateCostumer } from "../../components/ModalForm/CreateCustomer";
import { UserContext } from "../../contexts/UserContext";

export const Customers = () => {
  const { customers } = useContext(UserContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formModal, setFormModal] = useState<React.ReactNode | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  function handleCloseModal() {
    setFormModal(null);
    setIsOpenModal(false);
  }

  function handleOpenModal(form: React.ReactNode) {
    setFormModal(form);
    setIsOpenModal(true);
  }

  useEffect(() => {
    setFormModal(null);
    setIsOpenModal(false);
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gray-100 text-gray-600 antialiased">
      {isOpenModal && (
        <Modal handleCloseModal={handleCloseModal}>{formModal}</Modal>
      )}
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-start justify-center gap-10 pt-24 pb-4 sm:px-4 lg:px-8">
        <div className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-lg">
          <header className="py-2 pb-8">
            <h2 className="pb-2 text-xs font-semibold uppercase text-gray-600">
              Clientes
            </h2>
            <div className="flex items-center justify-end gap-4">
              <button
                onClick={() =>
                  handleOpenModal(
                    <ModalCreateCostumer handleCloseModal={handleCloseModal} />
                  )
                }
                className="right-2.5 bottom-2.5 flex items-center justify-center gap-4 rounded-lg bg-gray-700 px-4 py-4 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                <BsFillPersonPlusFill />
                Adicionar
              </button>
              <DownloadTableExcel
                filename="customers table"
                sheet="customers"
                currentTableRef={tableRef.current}
              >
                <button className="right-2.5 bottom-2.5 flex w-full max-w-xs items-center justify-center gap-4 rounded-lg bg-gray-700 px-4 py-4 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300">
                  <SiMicrosoftexcel />
                  Exportar lista
                </button>
              </DownloadTableExcel>
            </div>
          </header>
          <table ref={tableRef} className="w-full table-auto">
            <thead className="text-xs font-semibold uppercase text-gray-400">
              <tr className="grid grid-cols-1 grid-rows-none gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-manual-5">
                <th className="table-cell items-center lg:hidden">
                  <div className=" text-center font-semibold ">Informações</div>
                </th>
                <th className="hidden items-center lg:table-cell">
                  <div className="text-left font-semibold">Nome</div>
                </th>
                <th className="hidden items-start lg:table-cell">
                  <div className="text-left font-semibold">Email</div>
                </th>
                <th className="hidden items-start md:table-cell">
                  <div className="text-left font-semibold">Telefone</div>
                </th>
                <th className="hidden items-start md:table-cell">
                  <div className="text-left font-semibold">CPF</div>
                </th>
                <th className="hidden items-start lg:table-cell">
                  <div className="text-left font-semibold">Endereço</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {!!customers?.length ? (
                customers?.map((customer) => (
                  <CustomerRow
                    {...customer}
                    key={customer.cpf}
                    handleCloseModal={handleCloseModal}
                    handleOpenModal={handleOpenModal}
                  />
                ))
              ) : (
                <Emoji>Nenhum cliente cadastrado</Emoji>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

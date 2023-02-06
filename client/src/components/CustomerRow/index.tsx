import { useRef } from "react";
import {
  AiOutlineFileProtect,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { BsFillFilePersonFill } from "react-icons/bs";
import { FaUserEdit, FaUserTimes } from "react-icons/fa";
import { VscLocation } from "react-icons/vsc";
import { ICustomer } from "../../interfaces/customers";
import { ModalDeleteCustomer } from "../ModalForm/DeleteCustomer";
import { ModalUpdateCustomer } from "../ModalForm/UpdateCustomer";

interface ICustomerRow extends ICustomer {
  handleOpenModal: (form: React.ReactNode) => void;
  handleCloseModal: () => void;
}

export const CustomerRow = ({
  name,
  email,
  cpf,
  phone,
  address,
  _id,
  handleOpenModal,
  handleCloseModal,
}: ICustomerRow) => {
  const popover = useRef<HTMLTableDataCellElement>(null);

  function handlePopover(
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) {
    if (!popover.current) {
      return;
    }

    popover.current.classList.toggle("invisible");
    popover.current.classList.toggle("opacity-0");

    const rect = event.currentTarget.getBoundingClientRect();

    popover.current.style.left = `${event.clientX - rect.left}px`;
    popover.current.style.top = `${0}px`;
  }

  return (
    <>
      <tr
        onClick={(event) => handlePopover(event)}
        className="relative grid cursor-pointer grid-cols-1 gap-2 py-4 md:grid-cols-3 md:grid-rows-3 md:gap-4 lg:grid-cols-manual-5 lg:grid-rows-none"
      >
        <td
          ref={popover}
          className="invisible absolute z-10 inline-block rounded-lg border border-gray-200 bg-gray-900/90 text-sm font-light text-gray-500 opacity-0 shadow-sm transition-opacity duration-300"
        >
          <div className="flex items-center justify-center gap-4 px-3 py-2">
            <span
              onClick={() =>
                handleOpenModal(
                  <ModalUpdateCustomer
                    {...{
                      name,
                      email,
                      cpf,
                      phone,
                      address,
                      _id,
                      handleCloseModal,
                    }}
                  />
                )
              }
            >
              <FaUserEdit className="hover:fill-white" size={24} />
            </span>
            <span
              onClick={() =>
                handleOpenModal(
                  <ModalDeleteCustomer {...{ _id, handleCloseModal }} />
                )
              }
            >
              <FaUserTimes className="hover:fill-white" size={24} />
            </span>
          </div>
        </td>
        <td className="col-span-3 flex items-center justify-start gap-2 md:justify-start lg:col-span-1">
          <span>
            <BsFillFilePersonFill />
          </span>
          <div className="font-medium">{name}</div>
        </td>
        <td className="col-span-3 flex items-center justify-start gap-2 md:col-span-1">
          <span>
            <AiOutlineMail />
          </span>
          <div>{email}</div>
        </td>
        <td className="col-span-3 flex items-center justify-start gap-2 md:col-span-1">
          <span>
            <AiOutlinePhone />
          </span>
          <div>{phone}</div>
        </td>
        <td className="col-span-3 flex items-center justify-start gap-2 md:col-span-1">
          <span>
            <AiOutlineFileProtect />
          </span>
          <div>{cpf}</div>
        </td>
        <td className="col-span-3 flex items-center justify-start gap-2 lg:col-span-1">
          <span>
            <VscLocation />
          </span>
          <div>{address}</div>
        </td>
      </tr>
    </>
  );
};

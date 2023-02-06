import * as yup from "yup";

const PHONE_REGEX = /^(\(?[0-9]{2}\)?\s?[0-9]{4,5}-?[0-9]{4})$/;
const ZIPCODE_REGEX = /^\d{8}|\d{5}-?\d{3}$/;
const CPF_REGEX = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2})$/;

export const createCustomerSchema = yup.object().shape({
  name: yup.string().required("Campo obrigatório."),
  email: yup.string().required("Campo obrigatório.").email("Email inválido."),
  cpf: yup
    .string()
    .required("Campo obrigatório.")
    .matches(CPF_REGEX, "CPF inválido."),
  zipcode: yup.string().notRequired().matches(ZIPCODE_REGEX, "CEP inválido."),
  address: yup.string().required("Campo obrigatório."),
  phone: yup
    .string()
    .required("Campo obrigatório.")
    .matches(PHONE_REGEX, "Número inválido."),
});

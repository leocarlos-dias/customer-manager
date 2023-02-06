import * as yup from "yup";

export const loginUserSchema = yup.object().shape({
  username: yup.string(),
  password: yup.string(),
});

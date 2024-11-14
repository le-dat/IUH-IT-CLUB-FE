export const FORM_LOGIN = {
  email: "email",
  password: "password",
};

export const FORM_SIGN = {
  username: "username",
  codeStudent: "codeStudent",
  phone: "phone",
  ...FORM_LOGIN,
  confirmPassword: "confirmPassword",
};

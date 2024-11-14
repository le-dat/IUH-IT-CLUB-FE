export const FORM_LOGIN = Object.freeze({
  email: "email",
  password: "password",
} as const);

export const FORM_SIGN = Object.freeze({
  username: "username",
  codeStudent: "codeStudent",
  phone: "phone",
  ...FORM_LOGIN,
  confirmPassword: "confirmPassword",
} as const);

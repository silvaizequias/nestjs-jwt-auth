const username = /^[a-z0-9_-]{6,12}$/;

const password =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

export const RegExHelper = {
  username,
  password,
};

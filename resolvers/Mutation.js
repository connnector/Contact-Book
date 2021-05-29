import { login } from "./mutations/auth_mutations/login.js";
import { signup } from "./mutations/auth_mutations/signup.js";

const Mutation = {
  login,
  signup,
};

export { Mutation as default };

import { login } from "./mutations/auth_mutations/login.js";
import { signup } from "./mutations/auth_mutations/signup.js";
import { deleteUser } from "./mutations/user_mutations/Delete.js";
import { updateUser } from "./mutations/user_mutations/Update.js";

import { newContact } from "./mutations/contact_mutations/New.js";
import { deleteContact } from "./mutations/contact_mutations/Delete.js";
import { updateContact } from "./mutations/contact_mutations/Update.js";

const Mutation = {
  login,
  signup,
  deleteUser,
  updateUser,

  newContact,
  deleteContact,
  updateContact,
};

export { Mutation as default };

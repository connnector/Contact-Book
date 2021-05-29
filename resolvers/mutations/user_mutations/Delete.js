import User from "../../../models/User.js";
import { authCheck } from "../../../helper_functions/authCheck.js";

export const deleteUser = async (parent, args, context, info) => {
  // checking if user is authenticated

  authCheck(context);

  try {
    const existingUser = await User.findByIdAndDelete(context.id);

    return existingUser;
  } catch (e) {
    throw new Error(e);
  }
};

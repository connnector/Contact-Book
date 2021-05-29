import User from "../../../models/User.js";
import { authCheck } from "../../../helper_functions/authCheck.js";

export const updateUser = async (parent, args, context, info) => {
  // checking if user is authenticated

  authCheck(context);

  try {
    let user = await User.findById(context.id);

    await user.overwrite({
      email: user.email,
      password: user.password,
      ...args.data,
    });

    await user.save();

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

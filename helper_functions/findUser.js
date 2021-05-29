import User from "../models/User.js";

export const findUser = async (email) => {
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    throw new Error(e);
  }

  return existingUser;
};

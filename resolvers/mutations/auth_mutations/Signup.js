import User from "../../../models/User.js";
import { findUser } from "../../../helper_functions/findUser.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (parent, args, ctx, info) => {
  const email = args.data.email.toLowerCase();

  const existingUser = await findUser(email);

  if (existingUser) {
    throw new Error("Email already in use");
  }
  let newUser;

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(args.data.password, 12);
  } catch (e) {
    throw new Error();
  }

  try {
    newUser = await User.create({
      ...args.data,
      password: hashedPassword,
    });
  } catch (e) {
    throw new Error(e);
  }

  const token = jwt.sign(
    { id: newUser._id, email: newUser.email },
    process.env.SECRET
  );

  const returnData = {
    user: newUser,
    token,
    expirationTime: 1,
  };
  return returnData;
};

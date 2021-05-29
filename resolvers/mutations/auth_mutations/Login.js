import User from "../../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (parent, args, ctx, info) => {
  try {
    const existingUser = await User.findOne({ email: args.data.email });
    if (!existingUser) {
      throw new Error("User doesNot exist");
    }
    const match = await bcrypt.compare(
      args.data.password,
      existingUser.password
    );
    if (!match) {
      throw new Error("Incorrect password");
    }
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.SECRET
    );

    const returnData = {
      user: existingUser,
      token,
      expirationTime: 1,
    };
    return returnData;
  } catch (e) {
    throw new Error(e);
  }
};

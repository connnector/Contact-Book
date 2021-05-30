import User from "../models/User.js";

const Contact = {
  creator: async (parent, args, context, info) => {
    try {
      const creator = await User.findById(parent.creator);
      return creator;
    } catch (e) {
      throw new Error(e);
    }
  },
};

export { Contact as default };

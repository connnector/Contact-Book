import Contact from "../models/Contact.js";

export const findContactIfExisting = async (creator, email) => {
  let contact;

  try {
    contact = await Contact.findOne({
      creator,
      email,
    });

    return contact;
  } catch (error) {
    throw new Error(error);
  }
};

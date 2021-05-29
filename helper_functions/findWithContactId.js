import Contact from "../models/Contact.js";

export const findWithContactId = async (contact_id) => {
  let contact;

  try {
    contact = await Contact.findById(contact_id);

    return contact;
  } catch (error) {
    throw new Error(error);
  }
};

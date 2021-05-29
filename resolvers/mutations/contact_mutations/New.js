import Contact from "../../../models/Contact.js";
import { authCheck } from "../../../helper_functions/authCheck.js";
import { findContactIfExisting } from "../../../helper_functions/findContactIfExisting.js";

export const newContact = async (parent, args, context, info) => {
  //checking if user is authenticated

  authCheck(context);

  let contact = await findContactIfExisting(context.id, args.data.email);

  if (contact) {
    throw new Error("Email already used in another contact");
  }

  try {
    contact = new Contact({
      ...args.data,
      creator: context.id,
    });

    await contact.save();

    return contact;
  } catch (e) {
    throw new Error(e);
  }
};

import Contact from "../../../models/Contact.js";
import { authCheck } from "../../../helper_functions/authCheck.js";
import { findWithContactId } from "../../../helper_functions/findWithContactId.js";

export const deleteContact = async (parent, args, context, info) => {
  //checking if user is authenticated

  authCheck(context);

  const contact = await findWithContactId(args.contact_id);

  if (!contact) {
    throw new Error("Contact does not exist");
  }

  try {
    await contact.delete();

    console.log(contact);

    return contact;
  } catch (e) {
    throw new Error(e);
  }
};

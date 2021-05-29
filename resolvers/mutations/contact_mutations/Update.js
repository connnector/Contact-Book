import { authCheck } from "../../../helper_functions/authCheck.js";
import { findWithContactId } from "../../../helper_functions/findWithContactId.js";
import { findContactIfExisting } from "../../../helper_functions/findContactIfExisting.js";

export const updateContact = async (parent, args, context, info) => {
  //checking if user is authenticated

  authCheck(context);

  const contact = await findWithContactId(args.contact_id);

  if (!contact) {
    throw new Error("Contact does not exist");
  }

  if (args.data.email) {
    const email_alreadt_in_contact = findContactIfExisting(
      context.id,
      args.data.email
    );

    if (email_alreadt_in_contact) {
      throw new Error("Email already used in another contact");
    }
  }
  try {
    if (args.data.name) {
      await contact.overwrite({
        ...contact,
        name: args.data.name,
      });
    }
    if (args.data.email) {
      await contact.overwrite({
        ...contact,
        email: args.email,
      });
    }
    await contact.save();

    return contact;
  } catch (e) {
    throw new Error(e);
  }
};

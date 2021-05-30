import Contact from "../models/Contact.js";
import { authCheck } from "../helper_functions/authCheck.js";

const Query = {
  allContacts: async (parent, args, context, info) => {
    //checking legit user

    authCheck(context);

    let contacts;

    try {
      contacts = await Contact.find({ creator: context.id }, null, {
        skip: args.skip,
        limit: args.limit,
      });
    } catch (e) {
      throw new Error(e);
    }

    return contacts;
  },

  search: async (parent, args, context, info) => {
    //checking legit user

    authCheck(context);

    let contacts;

    try {
      contacts = await Contact.find({ creator: context.id });
    } catch (e) {
      throw new Error(e);
    }

    let searchedContacts;

    if (args.searchFrom === "NAME") {
      searchedContacts = contacts.filter((x) => {
        if (x.name.toLowerCase().includes(args.query.toLowerCase())) {
          return x;
        }
      });
    }
    if (args.searchFrom === "EMAIL") {
      searchedContacts = contacts.filter((x) => {
        if (x.email.toLowerCase().includes(args.query.toLowerCase())) {
          return x;
        }
      });
    }

    return searchedContacts;
  },
};

export { Query as default };

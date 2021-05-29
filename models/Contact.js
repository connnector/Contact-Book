import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

export { Contact as default };

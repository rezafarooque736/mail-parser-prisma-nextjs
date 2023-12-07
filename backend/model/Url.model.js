import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  from: String,
  fromEmail: String,
  to: String,
  toEmail: String,
  sent: {
    type: Date,
    required: true,
  },
  subject: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Url = mongoose.models.Url || mongoose.model("Url", urlSchema);

export default Url;

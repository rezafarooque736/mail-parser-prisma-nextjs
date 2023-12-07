import mongoose from "mongoose";

const domainSchema = new mongoose.Schema({
  domain: {
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

const Domain = mongoose.models.Domain || mongoose.model("Domain", domainSchema);

export default Domain;

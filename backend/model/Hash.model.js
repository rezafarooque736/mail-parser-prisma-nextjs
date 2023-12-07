import mongoose from "mongoose";

const hashSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
  },
  hashType: {
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

const Hash = mongoose.models.Hash || mongoose.model("Hash", hashSchema);

export default Hash;

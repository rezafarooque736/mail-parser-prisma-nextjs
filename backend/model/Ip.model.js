import mongoose from "mongoose";

const ipSchema = new mongoose.Schema({
  ip: {
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

const Ip = mongoose.models.Ip || mongoose.model("Ip", ipSchema);

export default Ip;

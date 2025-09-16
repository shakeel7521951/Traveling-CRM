import mongoose from "mongoose";

const compaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  channel: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  targetAudience: {
    type: String,
    required: true,
  },
  station: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Compaign = mongoose.model("compaign", compaignSchema);
export default Compaign;

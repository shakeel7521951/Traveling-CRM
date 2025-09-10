import sendBulkMessages from "../middlewares/sendBulkMessages.js";
import Compaign from "../models/Compaign.js";
import User from "../models/User.js";

export const createCompaign = async (req, res) => {
  try {
    const { name, type, status, target, startDate, endDate, message } =
      req.body;

    if (
      !name ||
      !type ||
      !status ||
      !target ||
      !startDate ||
      !endDate ||
      !message
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newCompaign = await Compaign.create({
      name,
      channel: type,
      status,
      targetAudience: target,
      startDate,
      endDate,
      message,
    });

    let recipients = [];

    if (target === "all") {
      recipients = await User.find({}, "name email phone");
    } else if (Array.isArray(target)) {
      recipients = await User.find(
        { _id: { $in: target } },
        "name email phone"
      );
    } else {
      return res.status(400).json({ message: "Invalid target value!" });
    }

    const messageBuilder = (recipientName) =>
      `Dear ${recipientName},\n\n${message}\n\nBest regards,\nTravelling Agency ✈️`;

    await sendBulkMessages(recipients, type, name, messageBuilder);

    return res.status(201).json({
      message: "Campaign created successfully!",
      compaign: newCompaign,
      recipients,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllCompaigns = async (req, res) => {
  try {
    const compaigns = await Compaign.find();
    return res.status(200).json(compaigns);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getCompaignById = async (req, res) => {
  try {
    const { id } = req.params;
    const compaign = await Compaign.findById(id);

    if (!compaign) {
      return res.status(404).json({ message: "Compaign not found" });
    }

    return res.status(200).json(compaign);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateCompaign = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const compaign = await Compaign.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!compaign) {
      return res.status(404).json({ message: "Compaign not found" });
    }

    return res
      .status(200)
      .json({ message: "Compaign updated successfully!", compaign });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const deleteCompaign = async (req, res) => {
  try {
    const { id } = req.params;
    const compaign = await Compaign.findByIdAndDelete(id);

    if (!compaign) {
      return res.status(404).json({ message: "Compaign not found" });
    }

    return res.status(200).json({ message: "Compaign deleted successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

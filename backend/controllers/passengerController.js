import Passenger from "../models/Passenger.js";

export const addPassenger = async (req, res) => {
  try {
    const { name, phone, email, flightDate, station } = req.body;
    if (!name || !phone || !email || !flightDate || !station) {
      return res.status(400).json({ message: "All fields required" });
    }
    await Passenger.create({ name, email, phone, flightDate, station });
    return res.status(200).json({ message: "Passenger added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const allPassenger = async (req, res) => {
  try {
    const allPassenger = await Passenger.find();
    if (allPassenger === null) {
      return res.status(404).json({ message: "No Passenger found" });
    }
    return res.status(200).json({ allPassenger });
  } catch (error) {}
};

export const editPassenger = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    const updatePassenger = await Passenger.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!updatePassenger) {
      return res.status(404).json({ message: "Passenger not found!" });
    }
    return res.status(200).json({ message: "Passenger updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePassenger = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    const deletePassenger = await Passenger.findOneAndDelete({ _id: id });
    if (!deletePassenger) {
      return res.status(404).json({ message: "Passenger not found!" });
    }
    return res.status(200).json({ message: "Passenger deleted succesfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


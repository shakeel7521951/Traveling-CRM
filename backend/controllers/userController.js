import User from "../models/User.js";
import SendMail from "../utils/SendMail.js";

export const createAccount = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All Fields Required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User with this email already exist" });
    }
    const newUser = await User.create({ name, email, phone, password });
    await newUser.save();
    const otp = await newUser.generateOTP();
    const subject = "Varify Your Email - Travelling CRM";
    const text = `<h3>Welcome ${name}</h3><br> 
    Please enter this otp <br/><strong style="font-size:20px; color:green;">${otp}</strong><br> 
    Best Regards,<br> Travelling Agency`;

    await SendMail(email, subject, text);
    return res
      .status(200)
      .json({ message: `Otp send to ${email}.Varify your account` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyAccount = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "user with this email not exist" });
    }
    if (user.isVarified === "true") {
      return res
        .status(400)
        .json({ message: "User already varified.Please login" });
    }
    if (!user.varifyOTP(otp)) {
      return res.status(400).json({ message: "Invalid or expired otp" });
    }
    const token = await user.getJWTToken();
    user.isVarified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    res.cookie("token", token, {
      httpOnly: "true",
      secure: "true",
      sameSite: "None",
    });
    return res.status(200).json({ message: "Account varified successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message:
          "User with this email not registered.Please create your account first",
      });
    }
    if (user.password !== password) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }
    const token = await user.getJWTToken();
    res.cookie("token", token, {
      httpOnly: "true",
      secure: "true",
      sameSite: "None",
    });
    return res.status(200).json({ message: "Login successfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

import jwt from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Please login to access this page" });
  }
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
};

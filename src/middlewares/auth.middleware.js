import jwt from "jsonwebtoken";
import User from "../../DB/Models/user.model.js";

export const auth = async (req, res, next) => {
  const { accesstoken } = req.headers;
  if (!accesstoken) {
    return next(new Error("Please login first"));
  }

  const decodedData = jwt.verify(accesstoken, process.env.JWT_SECRET_LOGIN);
  if (!decodedData || !decodedData.id) {
    return next(new Error("Invalid token payload"));
  }

  // Find user by ID
  const findUser = await User.findOne({ where: { id: decodedData.id } });
  if (!findUser) {
    return next(new Error("User not found"));
  }
  req.authUser = findUser;
  next();
};

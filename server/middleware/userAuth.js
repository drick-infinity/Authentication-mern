import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorised Login Again",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode && tokenDecode.id) {
      req.userId = tokenDecode.id;
      return next();
    } else {
      return res.json({
        success: false,
        message: "Not Authorised,Login Again",
      });
    }

  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export default userAuth;

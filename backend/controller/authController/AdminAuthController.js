import userModel from "../../models/userModel.js";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailExist = await userModel.findOne({ email: email });
    if (!emailExist) {
      return res.status(400).json({ message: "email not exist " });
    } else {
      if (!emailExist.is_admin) {
        return res.status(400).json({ message: "your not an admin" });
      } else {
        const passwordMatch = await bycrpt.compare(
          password,
          emailExist.password
        );
        if (!passwordMatch) {
          return res.status(400).json({ message: "password is not correct " });
        } else {
          const admintoken = jwt.sign(
            { userId: emailExist._id },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            status: true,
            adminData: emailExist,
            admintoken,
            message: "login completed sussfully",
          });
        }
      }
    }
  } catch (err) {
    next(err);
  }
};

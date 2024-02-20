import ownerModel from "../../models/propertyOwnerModel.js";
import { sendMailer } from "../../utils/sendMailer.js";
import { securePassword } from "../../utils/securePassword.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const insertPropertyOwner = async (req, res,next) => {
  try {
    const { email, name, number, password } = req.body;
    const sPassword = await securePassword(password);
    const emailExist = await ownerModel.findOne({ email: email });

    if (emailExist) {
      return res.status(400).json({ message: "email all ready exist" });
    } else {
      const owner = new ownerModel({
        name,
        number,
        email,
        password: sPassword,
      });
      const ownerData = await owner.save();

      if (ownerData) {
        const genartedOtp = Math.floor(Math.random() * 9000) + 1000;
        sendMailer(
          ownerData.name,
          ownerData.email,
          genartedOtp,
          "Travello property owner otp verification"
        );
        await ownerModel.updateOne(
          { _id: ownerData._id },
          {
            $set: {
              otp: genartedOtp,
            },
          }
        );
        res.status(200).json({
          ownerData,
          status: true,
          message: "An email send to your otp verifycation",
        });
      } else {
        res
          .status(400)
          .json({ message: "can't registered, somthing went wroung" });
      }
    }
  } catch (err) {
    next(err)
  }
};

export const ownerOtpVerification = async (req, res,next) => {
  try {
    const verifyOtp = await ownerModel.findOne({ _id: req.body.id });
    if (verifyOtp.otp != req.body.otp) {
      return res
        .status(400)
        .json({ message: "entering otp i swroung pleace check email" });
    } else {
      const propertytoken = jwt.sign(
        { userId: verifyOtp._id },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        status: true,
        propertytoken,
        propertyData: verifyOtp,
        message: "your otp verification completed sussfully",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const propertyOwnerLogin = async (req, res,next ) => {
  try {
    const { email, password } = req.body;
    const emailExist = await ownerModel.findOne({ email: email });
    if (!emailExist) {
      return res.status(400).json({ message: "enter email is incorrect" });
    } else {
      const passworMatch = await bcrypt.compare(password, emailExist.password);
      if (!passworMatch) {
        return res.status(400).json({ message: "enter password is incorrect" });
      } else {
        if (!emailExist.otp) {
          return res
            .status(400)
            .json({ message: "your account not verified pleace sign up" });
        } else {
          const propertytoken = jwt.sign(
            { userId: emailExist._id },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            status: true,
            propertytoken,
            propertyData: emailExist,
            message: "your login is completed successfully",
          });
        }
      }
    }
  } catch (err) {
   next(err);
  }
};

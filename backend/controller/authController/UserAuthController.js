import userModel from "../../models/userModel.js";
import tokenModel from "../../models/tokenModel.js";
import { sendMailer } from "../../utils/sendMailer.js";
import { securePassword } from "../../utils/securePassword.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

// INSERT USER SIGN UP DETAILS

export const insertUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const sPassword = await securePassword(password);
    const emailExist = await userModel.findOne({ email: email });

    if (emailExist) {
      return res.status(400).json({ message: "email all ready exist" });
    } else {
      const user = new userModel({
        name,
        email,
        password: sPassword,
      });
      const userData = await user.save();

      if (userData) {
        const id = userData._id;
        const token = await new tokenModel({
          userId: id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();

        const url = `${process.env.BASE_URL}/home/${userData._id}/${token.token}`;

        sendMailer(userData.name, userData.email, url, "Travello verify email");
        res.status(200).json({
          status: true,
          message: "An email send to your account verify",
        });
      } else {
        res
          .status(400)
          .json({ message: "can't registered, somthing went wroung" });
      }
    }
  } catch (err) {
    next(err);
  }
};

// USER EMAIL VERIFICATION FUNCTION

export const verifyUser = async (req, res, next) => {
  try {
    const verifyLink = await userModel.findOne({ _id: req.params.id });
    if (!verifyLink) {
      return res.status(400).json({ message: "link is invalid" });
    } else {
      const userToken = await tokenModel.findOne({
        token: req.params.token,
        userId: verifyLink,
      });

      if (!userToken) {
        return res.status(400).json({
          message:
            "Your verification link may have expired. Please click on resend for verify your Email.",
        });
      } else {
        const user = await userModel.findById({
          _id: verifyLink._id,
        });
        if (!user) {
          return res.status(400).json({
            message:
              "We were unable to find a user for this verification. Please SignUp!",
          });
        } else {
          const update = await userModel.updateOne(
            { _id: verifyLink._id },
            {
              $set: {
                is_verified: true,
              },
            }
          );
          if (update) {
            const userData = await userModel.findOne({ _id: verifyLink._id });
            const usertoken = jwt.sign(
              { userId: userData._id },
              process.env.SECRET_KEY,
              { expiresIn: "1h" }
            );
            return res.status(200).json({
              status: true,
              usertoken,
              userData,
              message: "Your account has been successfully verified",
            });
          }
        }
      }
    }
  } catch (err) {
    next(err);
  }
};

// USER LOGIN VERIFICATION FUNCTION

export const userLogin = async (req, res, next) => {
  try {
    const emailExist = await userModel.findOne({ email: req.body.email });
    if (!emailExist) {
      return res.status(400).json({ message: "enter email is incorrect" });
    } else {
      const passworMatch = await bcrypt.compare(
        req.body.password,
        emailExist.password
      );
      if (!passworMatch) {
        return res.status(400).json({ message: "enter password is incorrect" });
      } else {
        if (emailExist.is_block) {
          return res.status(400).json({ message: "your account is blocked " });
        } else {
          if (!emailExist.is_verified) {
            return res
              .status(400)
              .json({ message: "your account not verified pleace sign up" });
          } else {
            const userData = emailExist;
            const usertoken = jwt.sign(
              { userId: emailExist._id },
              process.env.SECRET_KEY,
              { expiresIn: "1h" }
            );
            return res.status(200).json({
              status: true,
              usertoken,
              userData,
              message: "your login is completed successfully",
            });
          }
        }
      }
    }
  } catch (err) {
    next(err);
  }
};

export const userGoogleSignUp = async (req, res, next) => {
  try {
    const { id, email, name } = req.body;
    const emailExist = await userModel.findOne({ email: email });
    if (emailExist) {
      res.status(400).json({ message: "email already exist pleace login" });
    } else {
      const user = new userModel({
        name: name,
        email: email,
        password: id,
      });
      await user.save();
      await userModel.updateOne(
        { email: email },
        {
          $set: {
            googleSignup: true,
          },
        }
      );
      const usertoken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });
      return res.status(200).json({
        status: true,
        usertoken,
        userData: user,
        message: "Your google account has been successfully created",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const userGoogleSignin = async (req, res, next) => {
  try {
    const exist = await userModel.findOne({ email: req.body.email });
    if (!exist.googleSignup) {
      res.status(400).json({ message: "don have account please sign up" });
    } else {
      const usertoken = jwt.sign(
        { userId: exist._id },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        status: true,
        usertoken,
        userData: exist,
        message: "Your google sign in has been successfully completed",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailExist = await userModel.findOne({ email: email });
    if (!emailExist) {
      return res
        .status(400)
        .json({ message: "In this email do have an account" });
    } else {
      if (!emailExist.is_verified) {
        return res
          .status(400)
          .json({ message: "In your account not verified " });
      } else {
        const tokenExist = await tokenModel.findOne({ userId: emailExist._id });
        const token =
          tokenExist ||
          new tokenModel({
            userId: emailExist._id,
            token: crypto.randomBytes(32).toString("hex"),
          });
        await token.save();
        const url = `${process.env.BASE_URL}/resetPassword/${emailExist._id}/${token.token}`;
        sendMailer(
          emailExist.name,
          emailExist.email,
          url,
          "Travello reset password mail"
        );
        res.status(200).json({
          status: true,
          message: "Reset password verification email sent",
        });
      }
    }
  } catch (err) {
    next(err);
  }
};

export const userRestPassword = async (req, res, next) => {
  try {
    const { password, id } = req.body;
    const sPassword = await securePassword(password);
    const resetData = await userModel.updateOne(
      { _id: id },
      { $set: { password: sPassword } }
    );
    const userData = await userModel.findOne({ _id: id });
    if (!resetData) {
      res.status(400).json({ message: "your reset password not completed" });
    } else {
      const usertoken = jwt.sign(
        { userId: userData._id },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        status: true,
        userData,
        usertoken,
        message: "reset password is completed",
      });
    }
  } catch (err) {
    next(err);
  }
};

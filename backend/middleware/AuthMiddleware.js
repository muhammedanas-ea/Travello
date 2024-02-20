import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import ownerModel from "../models/propertyOwnerModel.js";

export const userAuth = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token expired" });
      } else {
        try {
          const user = await userModel.findById({ _id: decoded.userId });
          if (!user) {
            return res.status(400).json({ message: "User not authorized" });
          } else {
            if (user.is_block) {
              return res
                .status(403)
                .json({ message: "This user is blocked by admin" });
            } else {
              req.body.userId = decoded.userId;
              next();
            }
          }
        } catch (error) {
          return res.status(500).json({ message: "Internal server error" });
        }
      }
    });
  } else {
    return res.status(400).json({ message: "User not authorized" });
  }
};

export const propertOwnerAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token expired" });
      } else {
        const owner = await ownerModel.findById({ _id: decoded.userId });
        if (!owner) {
          return res.status(400).json({ message: "owner not authorised" });
        } else {
          next();
        }
      }
    });
  } else {
    return res.status(400).json({ message: "owner not authorised" });
  }
};

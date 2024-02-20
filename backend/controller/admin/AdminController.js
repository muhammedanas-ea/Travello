import userModel from "../../models/userModel.js";
import propertyModel from "../../models/propertyModal.js";
import bookingModel from "../../models/bookingModal.js";
import { sendMailer } from "../../utils/sendMailer.js";

export const userDetails = async (req, res, next) => {
  try {
    const { active, search } = req.params;
    const page = (active - 1) * 6;
    const query = { is_verified: true };

    if (search != 0) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    const totalUser = await userModel.countDocuments(query);
    const userData = await userModel
      .find(query)
      .skip(page)
      .limit(8)
      .sort({ name: 1 });
    const totalPages = Math.ceil(totalUser / 8);

    if (!userData) {
      res.status(200).json({ status: false, message: "not exist useData" });
    } else {
      res.status(200).json({
        status: true,
        userData,
        totalPages,
        message: "user data sent",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const userBlock = async (req, res, next) => {
  try {
    const id = req.body._id;
    const update = await userModel.updateOne(
      { _id: id },
      { $set: { is_block: true } }
    );
    if (!update) {
      res.status(400).json({ message: "user block not completed" });
    } else {
      res.status(200).json({
        status: true,
        message: "that user is blocked",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const userUnblock = async (req, res, next) => {
  try {
    const id = req.body.id;
    const update = await userModel.updateOne(
      { _id: id },
      { $set: { is_block: false } }
    );
    if (!update) {
      res.status(400).json({ message: "user unblock not completed" });
    } else {
      res.status(200).json({
        status: true,
        message: "that user is unblocked",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const verifyNotification = async (req, res, next) => {
  try {
    const propertyData = await propertyModel
      .find({ Is_approve: false, Is_reject: false })
      .populate("propertOwner");
    res.status(200).json(propertyData);
  } catch (err) {
    next(err);
  }
};

export const propertyDetails = async (req, res, next) => {
  try {
    const { active, search } = req.params;
    const page = (active - 1) * 6;
    const query = { Is_approve: true };

    if (search != 0) {
      query.$or = [
        { PropertyName: { $regex: search, $options: "i" } },
        { State: { $regex: search, $options: "i" } },
      ];
    }

    const totalProperty = await propertyModel.countDocuments(query);

    const propertyData = await propertyModel
      .find(query)
      .skip(page)
      .limit(8)
      .sort({ PropertyName: 1 })
      .populate("propertOwner");
    const totalPages = Math.ceil(totalProperty / 8);
    if (!propertyData) {
      res
        .status(200)
        .json({ status: false, message: "not exist propertyData" });
    } else {
      res.status(200).json({
        status: true,
        propertyData,
        totalPages,
        message: "property data sent",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const propertBlock = async (req, res, next) => {
  try {
    const id = req.body._id;
    const update = await propertyModel.updateOne(
      { _id: id },
      { $set: { Is_block: true } }
    );
    if (!update) {
      res.status(400).json({ message: "property block not completed" });
    } else {
      res.status(200).json({
        status: true,
        message: "that property is blocked",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const propertUnBlock = async (req, res, next) => {
  try {
    const id = req.body.id;
    const update = await propertyModel.updateOne(
      { _id: id },
      { $set: { Is_block: false } }
    );
    if (!update) {
      res.status(400).json({ message: "property unblock not completed" });
    } else {
      res.status(200).json({
        status: true,
        message: "that property is unblocked",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const viewVerifyDetails = async (req, res, next) => {
  try {
    const propertyData = await propertyModel
      .findOne({ _id: req.params.id })
      .populate("propertOwner");
    res.status(200).json({ propertyData });
  } catch (err) {
    next(err);
  }
};

export const adminPropertyApprove = async (req, res, next) => {
  try {
    const { verify, id } = req.body;
    if (verify) {
      const updateApprove = await propertyModel
        .findByIdAndUpdate({ _id: id }, { $set: { Is_approve: true } })
        .populate("propertOwner");

      sendMailer(
        updateApprove.PropertyName,
        updateApprove.propertOwner.email,
        updateApprove.propertOwner.name,
        "Travello admin approve property"
      );
      res.status(200).json({
        message: "send a property approve mail",
      });
    } else {
      const updateApprove = await propertyModel
        .findByIdAndUpdate({ _id: id }, { $set: { Is_reject: true } })
        .populate("propertOwner");

      sendMailer(
        updateApprove.PropertyName,
        updateApprove.propertOwner.email,
        updateApprove.propertOwner.name,
        "Travello admin reject property"
      );
      res.status(200).json({
        message: "send a property rejection mail",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const dashboardData = async (req, res, next) => {
  try {
    const totalUser = await userModel.find({ is_verified: true });
    const totalProperty = await propertyModel.find({ Is_approve: true });
    const startDate = new Date();
    const firstDate = new Date(startDate);
    firstDate.setMonth(startDate.getMonth() - 1);

    const secondDate = new Date(startDate);
    secondDate.setMonth(startDate.getMonth() - 2);

    const thirdDate = new Date(startDate);
    thirdDate.setMonth(startDate.getMonth() - 3);

    const totalPrice = await bookingModel.aggregate([
      {
        $match: { bookingStatus: "success" },
      },
      {
        $group: { _id: null, totalSales: { $sum: "$TotalRate" } },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    const newYearSales = await bookingModel.aggregate([
      {
        $match: {
          bookingStatus: "success",
          $and: [{ Date: { $gt: firstDate } }, { Date: { $lt: startDate } }],
        },
      },
      {
        $group: { _id: null, totalSales: { $sum: "$TotalRate" } },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    const secondYearSales = await bookingModel.aggregate([
      {
        $match: {
          bookingStatus: "success",
          $and: [{ Date: { $gt: secondDate } }, { Date: { $lt: firstDate } }],
        },
      },
      {
        $group: { _id: null, totalSales: { $sum: "$TotalRate" } },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    const thirdYearSales = await bookingModel.aggregate([
      {
        $match: {
          bookingStatus: "success",
          $and: [{ Date: { $gt: thirdDate } }, { Date: { $lt: secondDate } }],
        },
      },
      {
        $group: { _id: null, totalSales: { $sum: "$TotalRate" } },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    const newYearTotalSales =
      newYearSales.length > 0 ? newYearSales[0].totalSales : 0;
    const secondYearTotalSales =
      secondYearSales.length > 0 ? secondYearSales[0].totalSales : 0;
    const thirdYearTotalSales =
      thirdYearSales.length > 0 ? thirdYearSales[0].totalSales : 0;

    res.status(200).json({
      message: "Data geting",
      totalUser: totalUser.length,
      totalProperty: totalProperty.length,
      totalPrice: totalPrice[0].totalSales,
      newYearTotalSales,
      secondYearTotalSales,
      thirdYearTotalSales,
      startDate,
      firstDate,
      thirdDate,
    });
  } catch (err) {
    next(err);
  }
};

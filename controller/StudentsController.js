import StudentsModel from "../model/StudentsModel.js";
import { generateToken } from "./../utility/tokenUtility.js";
export const Register = async (req, res) => {
  try {
    let reqBody = req.body;
    await StudentsModel.create(reqBody);
    return res.json({
      status: "Success",
      Message: "User Successfully Registered",
    });
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};

export const Login = async (req, res) => {
  try {
    let reqBody = req.body;
    let data = await StudentsModel.findOne(reqBody);
    if (data === null) {
      return res.json({
        status: "Fail",
        Message: "User Not Found",
      });
    } else {
      let token = generateToken(data["email"], data["_id"]);
      return res.json({
        status: "Success",
        Message: "User logged in",
        data: { token: token },
      });
    }
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};

export const ProfileDetails = async (req, res) => {
  try {
    let user_id = req.headers.user_id;
    let data = await StudentsModel.findOne({ _id: user_id });
    return res.json({
      status: "Success",
      message: "User Profile Successfully Found",
      data: data,
    });
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};

export const ProfileUpdate = async (req, res) => {
  try {
    let reqBody = req.body;
    let user_id = req.headers["user_id"];
    await StudentsModel.updateOne({ _id: user_id }, reqBody);
    return res.json({
      status: "Success",
      message: "User Profile Successfully Updated",
    });
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};

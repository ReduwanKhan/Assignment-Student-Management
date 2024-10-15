import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
export const uploadFile = async (req, res) => {
  try {
    const uploadedFile = req.files.file;
    const uploadPath = path.join(
      _dirname,
      "../uploads",
      Date.now() + "-" + uploadedFile.name
    );
    await uploadedFile.mv(uploadPath, (err) => {
      if (err) {
        return res.json({
          status: "Fail",
          data: "Error occurred during upload",
        });
      }
    });
    return res.json({ status: "Success", data: "File uploaded successfully" });
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};
export const readUploadFile = async (req, res) => {
  try {
    const filename = req.params.fileName;
    const filePath = path.join(_dirname, "../uploads", filename);
    res.sendFile(filePath);
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};
export const deleteUploadFile = async (req, res) => {
  try {
    const filename = req.params.fileName;
    const filePath = path.join(_dirname, "../uploads", filename);
    fs.unlink(filePath, (e) => {
      if (e) {
        res.status(500).send("Error while deleting file");
      }
    });
    return res.json({
      status: "Success",
      Message: "File deleted successfully",
    });
  } catch (e) {
    return res.json({ status: "Fail", Message: e.toString() });
  }
};

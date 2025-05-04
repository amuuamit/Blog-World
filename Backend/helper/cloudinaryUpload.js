const { cloudinary } = require("../Configurations/cloudinary.config.js");
const fs = require("fs").promises;

async function cloudinaryUpload(file) {
  try {
    const result = await cloudinary.uploader.upload(file.path);

    console.log("RESULT:", result);

    if (!result) {
      return false;
    }

    return result;
  } catch (e) {
    console.error("Error uploading to Cloudinary:", e);
    return false;
  } finally {
    // remove file from server
    try {
      await fs.rm(`uploads/${file.filename}`);
    } catch (e) {
      console.error("Error removing file:", e);
    }
  }
}

module.exports = cloudinaryUpload;
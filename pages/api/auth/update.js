

import User from "models/UserModel";
import connectDB from 'db/newdb';
import fs from "fs";
const formidable = require("formidable");

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  await connectDB();
  if (req.method !== "PUT") {
    return res.status(400).send({
      message: `${req.method} not supported`,
    });
  }
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).send({ error: "Error parsing form data" });
      }
      const getSingleValueFromArray = (value) => {
        if (Array.isArray(value) && value.length > 0) {
          return value[0];
        }
        return value;
      };
      const fname = getSingleValueFromArray(fields.fname);
      const lname = getSingleValueFromArray(fields.lname);
      const country = getSingleValueFromArray(fields.country);
      const address = getSingleValueFromArray(fields.address);
      const dob = getSingleValueFromArray(fields.dob);
      const mystate = getSingleValueFromArray(fields.mystate);
      const phone = getSingleValueFromArray(fields.phone);
      const email = getSingleValueFromArray(fields.email);
      const zipcode = getSingleValueFromArray(fields.zipcode);
      // Extract user data from the form fields
      const { password } = fields;
      const image = files.image;

      let imagePath;
      // Check if the image was uploaded
      if (image) {
        const thumbnailData = fs.readFileSync(image[0].filepath);
        const thumbnailContentType = image[0].mimetype;
        imagePath = {
          data: thumbnailData,
          contentType: thumbnailContentType,
        }
        if (image.size > 100000000) {
          return res
            .status(500)
            .send({ error: "Thumbnail should be less than 1mb" });
        }
      }
      const toUpdateUser = await User.findOne({ email: email });
      toUpdateUser.fname = fname;
      toUpdateUser.lname = lname;
      toUpdateUser.dob = dob;
      toUpdateUser.country = country;
      toUpdateUser.address = address;
      toUpdateUser.phone = phone;
      toUpdateUser.mystate = mystate;
      toUpdateUser.image = imagePath;
      toUpdateUser.zipcode = zipcode;
      await toUpdateUser.save();
      res.send({
        message: "User updated",
        toUpdateUser,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Error updating user profile" });
  }
};

export default handler;

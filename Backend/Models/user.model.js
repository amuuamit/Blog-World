var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var cloudinary = require("cloudinary").v2;

let userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please enter the First Name"],
      minlength: 3,
    },
    last_name: {
      type: String,
      required: [true, "Please enter the Last Name"],
      minlength: 3,
    },
    about: {
      type: String,
      required: [true, "Please enter a Summary"],
      minlength: 10,
      maxlength: 200,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "Please enter the email"],
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter the password"],
    },
    username: {
      type: String,
      required: [true, "Please enter a username"],
      unique: true,
      minlength: 3,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER", "QA-TESTER", "CONTENT_WRITTER"],
      default: "USER",
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default:
        "https://www.shutterstock.com/image-photo/workplace-winter-background-keayboard-notebook-260nw-713073412.jpg",
    },
    dob: {
      type: Date,
      required: [true, "Kindly provide the DOB!"],
      validate: {
        validator: function (value) {
          return value && value < new Date();
        },
        message: "Date of Birth must be in the past",
      },
    },
    articles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
      },
    ],
    phoneNumber: {
      type: String,
      required: [true, "Kindly provide the Phone Number"],
      match: [/^\d{10,15}$/, "Invalid phone number format"],
    },
    communication_address: {
      address_1: {
        type: String,
        required: true,
      },
      address_2: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        enum: ["INDIA", "USA", "AUSTRALIA"],
        default: "INDIA",
      },
      state: {
        type: String,
        required: true,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  // if (this.isModified("avatar") && this.avatar && !this.avatar.startsWith("http")) {
  //   try {
  //     let result = await cloudinary.uploader.upload(this.avatar);
  //     this.avatar = result.secure_url;
  //   } catch (error) {
  //     return next(error);
  //   }
  // }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = { User };

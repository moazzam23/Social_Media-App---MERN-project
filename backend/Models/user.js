const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const crypto = require("crypto")

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, " please enter a name"],
  },
  email: {
    type: String,
    required: [true, " please enter email"],
    unique: [true, " Email Alreay Exist"],
  },
  profilepic: {
    public_id: String,
    url: String,
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minlenght: [6, "password must be off 6 character"],

    select: false,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  resetpasswordtoken:String,
  resetpasswordexpire:String,
});

userschema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userschema.methods.generateToken = function () {
  return Jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

userschema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});


userschema.methods.getResetPasswordToken= function(){

  const  resetpassword = crypto.randomBytes(20).toString("hex");

  this.resetpasswordtoken = crypto.createHash("sha256").update(resetpassword).digest("hex");
  this.resetpasswordexpire =  Date.now() + 5 * 60 * 1000;
return resetpassword;

}

module.exports = mongoose.model("User", userschema);
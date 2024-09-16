const User = require("../model/User");
const bcrypt = require("bcrypt");
require("dotenv").config();

const getAllUser = async (req, res) => {
  const users = await User.find();
  if (!users) res.status(204).json({ message: "No Users found!!" });
  res.json(users);
};

const createNewUser = async (req, res) => {
  const { name, user, pwd } = req.body;
  if (!user || !pwd || !name)
    return res
      .status(400)
      .json({ message: "Name, email and pawssword are required" });
  const duplicate = await User.findOne({ email: user }).exec();
  if (duplicate) return res.sendStatus(409); //conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const result = await User.create({
      fullName: name,
      email: user,
      password: hashedPwd,
    });
    console.log(result);
    res.status(201).json({ success: `New User ${user} created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "ID parameter is required" });
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `No Employee matched id ${req.body.id}` });
  }
  if (req.body?.email) {
    const duplicate = await User.findOne({ email: req.body?.email });
    if (duplicate) return res.sendStatus(409);
    user.email = req.body.email;
  }
  if (req.body?.password) {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
  }
  const result = await user.save();
  res.json(result);
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res
      .status(400)
      .json({ message: "Employee ID parameter is required" });
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `No User matches id ${req.body.id}` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateRoles = async (req, res) => {
  const { id } = req.params;
  const { roles } = req.body;

  if (id === process.env.SUPER_ADMIN_ID) {
    return res
      .status(400)
      .json({ message: "Super Admin roles cannot be changed" });
  }
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { roles }, // Update the roles field
      { new: true, runValidators: true, context: "query" }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send a success response
    res.json({ message: "User roles updated successfully", user });
  } catch (error) {
    // Log the error for debugging
    console.error("Error updating roles:", error);

    // Send an error response
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  getUserData,
  updateRoles,
};

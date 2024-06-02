const User = require("../model/User");
const bcrypt = require('bcrypt');

const getAllUser = async (req, res) => {
  const users = await User.find();
  if (!users) res.status(204).json({ message: "No Users found!!" });
  res.json(users);
};

const createNewUser = async (req, res) => {
  const {name, user, pwd } = req.body;
  // const name = req.body.fullName;
  // const user = req.body.username;
  // const pwd = req.body.password;
  if (!user || !pwd || !name)
    return res
      .status(400)
      .json({ message: "Name, username and pawssword are required" });
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const result = await User.create({
      fullName: name,
      username: user,
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
  if (req.body?.username) {
    const duplicate = await User.findOne({ username: req.body?.username });
    if (duplicate) return res.sendStatus(409);
    user.username = req.body.username;
  }
  if (req.body?.password) {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
  }
  const result = await user.save();
  res.json(result);
};

const deleteUser = async (req, res) => {
  if(!req?.body?.id) return res.status(400).json({message: "Employee ID parameter is required"});
  const user = await User.findOne({_id: req.body.id}).exec();
  if(!user) {
    return res
    .status(204)
    .json({ message: `No User matches id ${req.body.id}` });
  }
  const result = await user.deleteOne({_id: req.body.id});
  res.json(result);
}

module.exports ={
    getAllUser, createNewUser, updateUser, deleteUser
}
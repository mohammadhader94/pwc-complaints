import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = 'test';

export const googleSignIn = async (req, res) => {
  const { email, name } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });

    if(oldUser){

      const token = jwt.sign({ email: oldUser.email, id: oldUser._id, role: oldUser.role }, secret, { expiresIn: "1h" });
      res.status(200).json({ result: oldUser, token });
    } else {
      //new google user

      const newUser = await UserModal.create({ email, name, role: "user" });
      const token = jwt.sign( { email: result.email, id: result._id, role: result.role}, secret, { expiresIn: "1h" } );
      res.status(200).json({ result: newUser, token });
    }

  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id, role: oldUser.role }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;

console.log(role);
  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, role });

    const token = jwt.sign( { email: result.email, id: result._id, role: result.role}, secret, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

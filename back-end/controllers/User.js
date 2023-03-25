import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from 'jsonwebtoken';


// Create a new user
const createUser = async (req, res) => {
  const { nom, prenom, email, password } = req.body;

  try {
    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = new User({
      nom,
      prenom,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await user.save();

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Could not create user", error });
    console.log(error)
  }
};


// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Could not get users", error });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Could not get user", error });
  }
};

// Update a user by ID
const updateUserById = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Hash the new password if it was included in the updates
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Could not update user", error });
  }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete user", error });
  }
};
// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user with the provided email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // Check if the provided password matches the hashed password in the database
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        console.log("password not correct")
        return res.status(401).json({ message: "Invalid email or password" });
        
      }
  
      // Create a JSON Web Token (JWT) for the user
      const token = jwt.sign({ email: user.email, id: user._id }, "secret", { expiresIn: "1h" });
  
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json({ message: "Could not log in user", error });
      console.log(error)
    }
  };
  
  export { createUser, loginUser, getUsers, getUserById, updateUserById, deleteUserById };
  

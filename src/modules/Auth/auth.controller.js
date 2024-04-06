import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../../DB/Models/user.model.js";
import PhoneNumber from "../../../DB/Models/phone_number.model.js";
import Skill from "../../../DB/Models/skill.model.js";

// ========================================= SignUp API ================================//
export const signUp = async (req, res, next) => {
  
    const { name, email, password, age, phoneNumbers, skills } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email, and password are required" });
    }

    // Check if the email already exists
    const isEmailDuplicated = await User.findOne({ where: { email } });
    if (isEmailDuplicated) {
      return res.status(400).json({ success: false, message: "Email already exists. Please try another email" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS);

      // Create new user
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        age,
        phoneNumbers: phoneNumbers.map(number => ({ number })),
        skills: skills.map(skill => ({ name: skill })),
      }, {
        include: [{ model: PhoneNumber, as: "phoneNumbers" }, { model: Skill, as: "skills" }]
      });

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser,
      });
    
    
};

// ========================================= SignIn API ================================//

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  // get user by email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return next(new Error({ message: "Invalid login credentials" ,cause:401}));
  }
  // check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return next(new Error({ message: "Invalid login credentials" ,cause:401}));
  }

  // generate login token
  const token = jwt.sign(
    { email, id: user.id, loggedIn: true },
    process.env.LOGIN_SIGNATURE,
    { expiresIn: "1d" }
  );
 
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: {
      token,
    },
  });
};

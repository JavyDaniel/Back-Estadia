import {user, encryptPassword, comparePassword} from "../models/user.js";
import { SECRET_KEY } from "../config.js";
import jwt from 'jsonwebtoken'
export const signUp = async (req, res) => {
  try {
    const { username, email, password, rol } = req.body;

    const userFound = await user.findOne({ $or: [{username: username}, {email: email}]});

    if(userFound == null){
        const newUser = await user({
            username: username,
            email: email,
            password: await encryptPassword(password),
            rol: rol
        })

        user.create(newUser);
        // newUser.password="";
        const token = jwt.sign({id: newUser._id}, SECRET_KEY, {expiresIn: 86400});
        const usr = {
          _id : newUser._id,
          username: newUser.username,
          email: newUser.email,
          rol: newUser.rol,
          token: token
      };    
        return res.status(200).json(newUser);
    }else{return res.status(202).json({message:'Existing user'})}


  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const {email, password} = req.body;
    const userFound = await user.findOne({email: email});

    if(!userFound) return res.status(202).json("User not found");

    const matchPassword = await comparePassword(password, userFound.password);
        
    if(!matchPassword) return res.status(202).json("Invalid password");

    const token = jwt.sign({id: userFound._id}, SECRET_KEY, {expiresIn: 86400});

    userFound.password="";

    const usr = {
      _id : userFound._id,
      username: userFound.username,
      email: userFound.email,
      rol: userFound.rol,
      token: token
  };
    return res.status(200).json(userFound);
 
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

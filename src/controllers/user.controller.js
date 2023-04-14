import { user } from "../models/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const rol = req.params.rol;
    const usrs = await user
      .find({ rol: { $ne: rol } })
      .select(["username", "email", "rol", "_id"]);

    return res.status(200).json(usrs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

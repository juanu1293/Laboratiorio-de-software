// controllers/userController.js
const bcrypt = require("bcrypt");
const { createUser,findUserByEmail } = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      fecha_nacimiento,
      lugar_nacimiento,
      direccion_facturacion,
      genero,
      correo,
      contrasena,
      foto,
      cedula,
    } = req.body;

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);

    // Llamar al modelo
    const newUser = await createUser({
      nombre,
      apellido,
      fecha_nacimiento,
      lugar_nacimiento,
      direccion_facturacion,
      genero,
      correo,
      contrasena: hashedPassword,
      foto,
      cedula,
    });

    res.status(201).json({
      mensaje: "Usuario registrado con éxito",
      usuario: newUser,
    });
  } catch (error) {
    console.error("Error en registerUser:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    // Buscar usuario
    const user = await findUserByEmail(correo);
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    // Validar contraseña
    const validPassword = await bcrypt.compare(contrasena, user.contrasena);
    if (!validPassword) return res.status(401).json({ error: "Contraseña incorrecta" });

    res.json({ mensaje: "Login exitoso", usuario: user });
  } catch (error) {
    console.error("Error en loginUser:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = { registerUser, loginUser };


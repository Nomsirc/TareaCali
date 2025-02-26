const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/firebase');

const register = async (req, res) => {
  const { username, password, email, age, phone, role } = req.body;

  try {
    // Verifica si el usuario ya existe
    const userRef = db.collection('users').doc(username);
    const doc = await userRef.get();

    if (doc.exists) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Encripta la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Guarda el usuario en Firestore
    await userRef.set({
      username,
      password: hashedPassword,
      email,
      age,
      phone,
      role: role || 'user',
    });

    // Genera un token JWT
    const payload = {
      user: {
        id: username,
        role: role || 'user',
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Obtén el usuario desde Firestore
    const userRef = db.collection('users').doc(username);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const user = doc.data();

    // Verifica la contraseña
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Genera un token JWT
    const payload = {
      user: {
        id: username,
        role: user.role,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

module.exports = { register, login };
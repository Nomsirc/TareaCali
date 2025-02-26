const db = require('../config/firebase');

const saveGrade = async (req, res) => {
  const { value } = req.body;
  const username = req.user.id; // Obtén el nombre de usuario del token

  try {
    // Guarda la calificación en Firestore
    const gradeRef = db.collection('grades').doc(); // Crea un ID automático
    await gradeRef.set({
      username,
      value,
    });

    res.json({ id: gradeRef.id, username, value });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

const getMyGrades = async (req, res) => {
  const username = req.user.id; // Obtén el nombre de usuario del token

  try {
    // Obtén las calificaciones del usuario desde Firestore
    const gradesRef = db.collection('grades').where('username', '==', username);
    const snapshot = await gradesRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ msg: 'No se encontraron calificaciones' });
    }

    const grades = [];
    snapshot.forEach((doc) => {
      grades.push({ id: doc.id, ...doc.data() });
    });

    res.json(grades);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

const getAllGrades = async (req, res) => {
  try {
    // Obtén todas las calificaciones desde Firestore
    const gradesRef = db.collection('grades');
    const snapshot = await gradesRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ msg: 'No se encontraron calificaciones' });
    }

    const grades = [];
    snapshot.forEach((doc) => {
      grades.push({ id: doc.id, ...doc.data() });
    });

    res.json(grades);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

module.exports = { saveGrade, getMyGrades, getAllGrades };
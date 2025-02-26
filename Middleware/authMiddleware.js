const jwt = require('jsonwebtoken');

const authMiddleware = (roles) => (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No hay token, autorización denegada' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    if (roles && !roles.includes(req.user.role)) {
      return res.status(403).json({ msg: 'Acceso denegado' });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token no válido' });
  }
};

module.exports = authMiddleware;
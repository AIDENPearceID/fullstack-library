const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req,res,next){
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ msg: 'No auth header' });
  const token = header.split(' ')[1];
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch(e) {
    res.status(401).json({ msg: 'Invalid token' });
  }
}

module.exports = authMiddleware;

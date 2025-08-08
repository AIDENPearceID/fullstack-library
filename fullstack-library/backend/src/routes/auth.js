const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

function validUsername(username){
  if(!username) return false;
  if (username.length < 5) return false;
  if (username.includes('_') || username.includes('.')) return false;
  const re = /^[a-zA-Z0-9\u0400-\u04FF-]+$/;
  return re.test(username);
}

router.post('/register', async (req,res)=>{
  try {
    const { username, email, password } = req.body;
    if(!validUsername(username)) return res.status(400).json({ msg: 'اسم مستخدم غير صالح' });
    if(!email || !password) return res.status(400).json({ msg: 'اكمل البيانات' });
    if (await User.findOne({ $or:[{username},{email}] })) return res.status(400).json({ msg:'مستخدم موجود' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, passwordHash: hash });
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { username: user.username, email: user.email } });
  } catch(err){ console.error(err); res.status(500).json({ msg:'server error' }); }
});

router.post('/login', async (req,res)=>{
  try {
    const { emailOrUsername, password } = req.body;
    const user = await User.findOne({ $or:[{ email: emailOrUsername }, { username: emailOrUsername }] });
    if(!user) return res.status(400).json({ msg: 'مستخدم غير موجود' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if(!ok) return res.status(400).json({ msg: 'كلمة مرور خاطئة' });
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { username: user.username, email: user.email } });
  } catch(e){ console.error(e); res.status(500).json({ msg:'server error' }); }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../utils/authMiddleware');

// عرض مستخدم عام
router.get('/:username', async (req,res) => {
  const username = req.params.username;
  const user = await User.findOne({ username }).select('-passwordHash -links');
  if(!user) return res.status(404).json({ msg: 'Not found' });
  res.json(user);
});

// تحديث البروفايل (روابط/افاتار)
router.put('/me', authMiddleware, async (req,res) => {
  const payload = req.body;
  const user = await User.findById(req.user.id);
  if(!user) return res.status(404).json({ msg:'Not found' });
  user.links = payload.links || user.links;
  user.avatar = payload.avatar || user.avatar;
  await user.save();
  res.json({ msg:'updated', user });
});

// تاب/إلغاء تاب
router.post('/:username/follow', authMiddleware, async (req,res) => {
  const target = req.params.username;
  const me = await User.findById(req.user.id);
  if(!me) return res.status(404).json({ msg:'Not found' });
  if(!me.following) me.following = [];
  const users = await User.find();
  const targetUser = users.find(u => u.username === target);
  if(!targetUser) return res.status(404).json({ msg:'target not found' });

  if (me.following.includes(target)) {
    me.following = me.following.filter(u => u !== target);
    targetUser.followers = (targetUser.followers || []).filter(u => u !== me.username);
  } else {
    me.following.push(target);
    targetUser.followers = targetUser.followers || [];
    if(!targetUser.followers.includes(me.username)) targetUser.followers.push(me.username);
  }
  await me.save();
  await targetUser.save();
  res.json({ msg: 'ok', following: me.following });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const authMiddleware = require('../utils/authMiddleware');

// إضافة مراجعة (محمي)
router.post('/', authMiddleware, async (req,res) => {
  const { type, subtype, title, summary, rating, image } = req.body;
  if(!title || !summary) return res.status(400).json({ msg:'اكمل الحقول' });
  const review = await Review.create({
    author: { username: req.user.username, userId: req.user.id },
    type, subtype, title, summary, rating: (rating||4), image
  });
  res.json(review);
});

// قائمة مراجعات مع فلترة
router.get('/', async (req,res) => {
  const { type, subtype } = req.query;
  let q = {};
  if(type) q.type = type;
  if(subtype) q.subtype = subtype;
  const list = await Review.find(q).sort({ createdAt: -1 }).limit(100);
  res.json(list);
});

// تفاصيل
router.get('/:id', async (req,res) => {
  const review = await Review.findById(req.params.id);
  if(!review) return res.status(404).json({ msg:'not found' });
  res.json(review);
});

module.exports = router;

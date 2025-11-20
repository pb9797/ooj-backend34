
const Gallery = require('../models/GalleryImage');
exports.list = async (req,res)=>{
  const g = await Gallery.find().sort({createdAt:-1}).limit(200);
  res.json(g);
};
exports.create = async (req,res)=>{
  // expects file upload handled by upload middleware
  if(!req.file) return res.status(400).json({error:'no file'});
  const url = req.file.location || req.file.path || '';
  const g = await Gallery.create({url, title: req.body.title || ''});
  res.json(g);
};

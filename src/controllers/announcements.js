
const Announcement = require('../models/Announcement');
exports.create = async (req,res)=>{
  const a = await Announcement.create({title:req.body.title, body:req.body.body, image:req.body.image});
  res.json(a);
};
exports.list = async (req,res)=>{
  const a = await Announcement.find().sort({createdAt:-1}).limit(100);
  res.json(a);
};

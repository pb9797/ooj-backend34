
const Leadership = require('../models/Leadership');
exports.list = async (req,res)=>{
  const l = await Leadership.find().sort({createdAt:-1});
  res.json(l);
};
exports.create = async (req,res)=>{
  // file uploaded via upload middleware
  const photo = req.file ? (req.file.location || req.file.path) : req.body.photo;
  const l = await Leadership.create({name:req.body.name, role:req.body.role, photo, bio:req.body.bio||''});
  res.json(l);
};

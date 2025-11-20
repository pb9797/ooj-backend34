
const Application = require('../models/Application');
exports.create = async (req,res)=>{
  const data = req.body;
  const a = await Application.create({name:data.name, dob:data.dob, telephone:data.telephone, email:data.email, data});
  res.json({message:'submitted', id:a._id});
};
exports.list = async (req,res)=>{
  const a = await Application.find().limit(200);
  res.json(a);
};
exports.approve = async (req,res)=>{
  // simple approval: create member from application
  const id = req.params.id;
  const a = await Application.findById(id);
  if(!a) return res.status(404).json({error:'not found'});
  a.status='approved'; await a.save();
  res.json({message:'approved', application:a});
};

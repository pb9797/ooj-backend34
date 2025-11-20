
const Program = require('../models/Program');
exports.list = async (req,res)=>{
  const p = await Program.find().sort({day:1});
  res.json(p);
};
exports.create = async (req,res)=>{
  const p = await Program.create(req.body);
  res.json(p);
};

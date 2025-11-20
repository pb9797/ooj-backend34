
const Homepage = require('../models/Homepage');
exports.get = async (req,res)=>{
  const h = await Homepage.findOne().lean();
  res.json(h||{});
};
exports.save = async (req,res)=>{
  const payload = req.body;
  let h = await Homepage.findOne();
  if(!h) h = await Homepage.create(payload);
  else { Object.assign(h, payload); await h.save(); }
  res.json(h);
};


const Rules = require('../models/Rules');
exports.get = async (req,res)=>{
  const r = await Rules.findOne().lean();
  res.json(r||{text:''});
};
exports.save = async (req,res)=>{
  const payload = req.body;
  let r = await Rules.findOne();
  if(!r) r = await Rules.create(payload);
  else { r.text = payload.text; await r.save(); }
  res.json(r);
};

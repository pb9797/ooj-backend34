
const Member = require('../models/Member');
const csv = require('csvtojson');

exports.listPublic = async (req,res)=>{
  const m = await Member.find({}, {name:1,fop_id:1}).limit(100).lean();
  res.json(m);
};

exports.list = async (req,res)=>{
  const m = await Member.find().limit(1000);
  res.json(m);
};

exports.import = async (req,res)=>{
  const data = req.body.members;
  if(!Array.isArray(data)) return res.status(400).json({error:'members array required'});
  let count = 0;
  for(const item of data){
    await Member.create(item);
    count++;
  }
  res.json({message:'Imported', imported:count});
};

exports.update = async (req,res)=>{
  const {fop_id,name,dob,raw,telephone,town,region,photo} = req.body;
  if(!fop_id) return res.status(400).json({error:'fop_id required'});
  const m = await Member.findOneAndUpdate({fop_id}, {$set:{name,dob,raw,telephone,town,region,photo}}, {new:true, upsert:true});
  res.json(m);
};


const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
exports.login = async (req,res)=>{
  const {email,password} = req.body;
  const u = await User.findOne({email});
  if(!u) return res.status(401).json({error:'Invalid'});
  const ok = bcrypt.compareSync(password, u.passwordHash || '');
  if(!ok) return res.status(401).json({error:'Invalid'});
  const token = jwt.sign({id:u._id,email:u.email,role:u.role}, process.env.JWT_SECRET, {expiresIn:'7d'});
  res.json({token});
};
exports.createAdmin = async (req,res)=>{
  const {email,password} = req.body;
  const hash = bcrypt.hashSync(password, 10);
  const u = await User.create({email, passwordHash: hash, role:'admin'});
  res.json({id:u._id, email:u.email});
};

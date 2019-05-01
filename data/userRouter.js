const express =require("express");
const User = require("./helpers/userDb")

const router = express.Router();
//=================================================Post Routers
router.post("/",(req,res)=>{})
//=================================================Get Routers
router.get("/",(req,res)=>{})
//=================================================Update Routers
router.put("/",(req,res)=>{})
//=================================================Delete Routers
router.delete("/",(req,res)=>{})

module.exports = router
const express = require("express");
const User = require("./helpers/userDb");
const {nameChecker} = require("./middleware")

const router = express.Router();
//=================================================Post Routers
router.post("/", (req, res) => {

});
//=================================================Get Routers
router.get("/", (req, res) => {
  User.get()
    .then(res => {
      res.status(200).json(res);
    })
    .catch(err => {
      res.status(500).json({ error: "cannot GET data" });
    });
});
//---------------------------------------By ID
router.get("/:id", (req, res) => {
  const id = req.params;
  
  if (!id) {
    status(404).json({ message: "No user found" });
  } else {
    User.getById(id)
      .then(res => {
        res.status(200).json(res);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Server error getting that Info" });
      });
  }
});
//=================================================Update Routers
router.put("/", (req, res) => {});
//=================================================Delete Routers
router.delete("/", (req, res) => {});

module.exports = router;

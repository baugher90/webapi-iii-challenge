const express = require("express");
const Users = require("./helpers/userDb");
const capsChecker = require("./middleware");

const router = express.Router();
//=================================================Post Routers
router.post("/", capsChecker, (req, res) => {
  req.body.name
    ? Users.insert(req.body)
        .then(user => {
          res.status(201).json(user);
        })
        .catch(err => {
          res
            .status(500)
            .json({ message: "There was an error while saving the user" });
        })
    : res.status(400).json({ message: "Please provide a name for the user." });
});
//=================================================Get Routers
router.get("/", (req, res) => {
  Users.get()
    .then(user => {
      res.status(200).json({ user });
    })
    .catch(err => {
      res.status(500).json({ message: "cannot GET data" });
    });
});
//---------------------------------------By ID
router.get("/:id", (req, res) => {
  const id = req.params.id || "";

  !id || id.length < 0
    ? res.status(404).json({ message: "No user found" })
    : Users.getById(id)
        .then(user => {
          res.status(200).json(user);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: "Server error getting that Info" });
        });
});

//=================================================Update Routers
router.put("/:id", (req, res) => {
  !req.params.id || !req.body
    ? res.status(400).json({
        error:
          "Please provide the ID of the user you intend to update as well as your intended changes."
      })
    : Users.update(req.params.id, req.body)
        .then(user => {
          user
            ? res
                .status(200)
                .json({ message: "You successfully updated the user." })
            : res.status(404).json({
                message: "The user with the specified ID does not exist."
              });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: "The user information could not be updated." });
        });
});
//=================================================Delete Routers
router.delete("/:id", (req, res) => {
  Users.remove(req.params.id).then(users => {
    (users === 1
      ? res.status(200).json({ message: `Number of users deleted: ${users}` })
      : res
          .status(404)
          .json({ message: `The user with the specified ID does not exist.` })
    ).catch(err => {
      res
        .status(500)
        .json({ message: `${users} users could not be removed from database` });
    });
  });
});

module.exports = router;

const express =require("express");
const Posts = require("./helpers/postDb")

const router = express.Router();
//=================================================Post Routers
router.post("/", (req, res) => {
    req.body.text
      ? Posts.insert(req.body)
          .then(post => {
            res.status(201).json(post);
          })
          .catch(err => {
            res
              .status(500)
              .json({ message: "There was an error while saving the post" });
          })
      : res.status(400).json({ message: "Please provide text for the post." });
  });
  //=================================================Get Routers
  router.get("/", (req, res) => {
    Posts.get()
      .then(post => {
        res.status(200).json({ post });
      })
      .catch(err => {
        res.status(500).json({ message: "cannot GET data" });
      });
  });
  //---------------------------------------By ID
  router.get("/:id", (req, res) => {
    const id = req.params.id || "";
  
    !id || id.length < 0
      ? res.status(404).json({ message: "No post found" })
      : Posts.getById(id)
          .then(post => {
            res.status(200).json(post);
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
            "Please provide the ID of the post you intend to update as well as your intended changes."
        })
      : Posts.update(req.params.id, req.body)
          .then(post => {
            post
              ? res
                  .status(200)
                  .json({ message: "You successfully updated the post." })
              : res.status(404).json({
                  message: "The post with the specified ID does not exist."
                });
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: "The post information could not be updated." });
          });
  });
  //=================================================Delete Routers
  router.delete("/:id", (req, res) => {
    Posts.remove(req.params.id).then(posts => {
      (posts === 1
        ? res.status(200).json({ message: `Number of posts deleted: ${posts}` })
        : res
            .status(404)
            .json({ message: `The post with the specified ID does not exist.` })
      ).catch(err => {
        res
          .status(500)
          .json({ message: `${posts} posts could not be removed from database` });
      });
    });
  });
  

module.exports = router
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res
    .send({
      response: "Server is up and running. Please insert /home in domain ",
    })
    .status(200);
});

module.exports = router;

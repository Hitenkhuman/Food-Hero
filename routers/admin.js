const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");

router.post("/login", async (req, res) => {
  Admin.findOne({ email: req.body.email })
    .then((data) => {
      if (data) {
        if (data.password == req.body.password) {
          res.send({
            success: true,
            massage: "Login successful",
            data: [data],
          });
        } else {
          res.send({
            success: false,
            massage: "Invalid password",
            data: null,
          });
        }
      } else {
        res.send({
          success: false,
          massage: "try again later",
          data: null,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/changepassword/:id", async (req, res) => {
  console.log("put from admin req");

  Admin.findByIdAndUpdate(
    req.body.id,
    { password: req.body.password },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .then((data) => {
      res.send({
        success: true,
        massage: "Successfully Updated",
        data: data,
      });
    })
    .catch((error) => {
      res.send({
        success: false,
        massage:
          "Something went wrong while updating please check restaurant id" ||
          error.massage,
        data: null,
      });
    });
});
module.exports = router;

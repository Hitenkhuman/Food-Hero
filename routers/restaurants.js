const express = require("express");
const fileUpload = require("express-fileupload");
const bcrypt = require("bcrypt");
const router = express.Router();
const config = require("../config");
const Restaurant = require("../models/restaurant");
//const { Restaurant } = require("../models/models");
const saltRounds = 10;
router.get("/", async (req, res) => {
  await Restaurant.find()
    .then((restaurants) => {
      if (restaurants)
        res.send({
          success: true,
          massae: "Data found",
          data: restaurants,
        });
      else
        res.send({
          success: false,
          massage: "No restaurants are available in database",
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({
        success: false,
        massage:
          error.massage || "Something went wrong while retrieving Restaurants",
      });
    });
});

router.get("/:id", async (req, res) => {
  await Restaurant.findById(req.params.id)
    .then((restaurants) => {
      res.send({
        success: true,
        massae: "Data found",
        data: restaurants,
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage:
          error.massage ||
          "Something went wrong while retrieving Restaurants please check restaurant id",
      });
      console.log(error);
    });
});

router.get("/mobile/:mobile", async (req, res) => {
  await Restaurant.findOne({ mobile: req.params.mobile })
    .then((restaurant) => {
      if (restaurant)
        res.send({
          code: 400,
          status: "Occupied",
          massage: "Try with diffrent number",
        });
      else {
        res.send({
          code: 100,
          status: "Available",
          massage: "Ok",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage:
          error.massage ||
          "Something went wrong while retrieving Restaurants please check restaurant id",
      });
      console.log(error);
    });
});

router.get("/email/:emailid", async (req, res) => {
  await Restaurant.findOne({ email: req.params.emailid })
    .then((restaurant) => {
      if (restaurant)
        res.send({
          code: 400,
          status: "Occupied",
          massage: "Try with diffrent email id",
        });
      else {
        res.send({
          code: 100,
          status: "Available",
          massage: "Ok",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage:
          error.massage ||
          "Something went wrong while retrieving Restaurants please check restaurant id",
      });
      console.log(error);
    });
});

router.get("/device/all", async (req, res) => {
  await Restaurant.find()
    .select({ devicetoken: 1 })
    .then((restaurant) => {
      if (restaurant) {
        res.send({
          success: true,
          massae: "Data found",
          data: restaurants,
        });
      } else {
        res.status(100).json({
          success: false,
          massage: "Data not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage:
          error.massage ||
          "Something went wrong while retrieving token please check restaurant id",
      });
      console.log(error);
    });
});

router.get("/device/:id", async (req, res) => {
  await Restaurant.findById(req.params.id)
    .then((restaurant) => {
      if (restaurant) {
        res.json({
          success: true,
          massage: "Data Found",
          data: {
            devicetoken: restaurant.devicetoken,
            name: restaurant.name,
            _id: restaurant._id,
          },
        });
      } else {
        res.status(100).json({
          success: false,
          massage: "No Restaurant are available",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage:
          error.massage ||
          "Something went wrong while retrieving token please check restaurant id",
      });
      console.log(error);
    });
});

router.get("/profileimg/:id", async (req, res) => {
  await Restaurant.findById(req.params.id)
    .select({ imgurl: 1 })
    .then((restaurants) => {
      res.send({
        success: true,
        massae: "Data found",
        data: {
          _id: restaurants._id,
          imgurl: config.img_path + restaurants.imgurl,
        },
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage:
          error.massage ||
          "Something went wrong while retrieving Restaurants please check restaurant id",
      });
      console.log(error);
    });
});

router.post("/add", async (req, res) => {
  console.log("post req");
  let filename = "";
  if (req.files.img) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    const target_file = req.files.img;
    filename = req.body.authid + "_profile_pic_" + target_file.name;
    const uploadPath = "./static/profile_pic/" + filename;
    target_file.mv(uploadPath, (err) => {
      if (err)
        res.send({
          success: false,
          massage: "Issues with file",
        });
    });
  }
  bcrypt.hash(req.body.password, saltRounds, (error, hash) => {
    if (error) {
      return res.send(error);
    }
    const restaurant = new Restaurant({
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      password: hash,
      imgurl: filename,
      openingtime: req.body.openingtime,
      closingtime: req.body.closingtime,
      state: req.body.state,
      district: req.body.district,
      address: req.body.address,
      devicetoken: req.body.devicetoken,
      authid: req.body.authid,
    });
    restaurant
      .save()
      .then((data) => {
        res.send({
          success: true,
          massage: "Successfully Added",
          data: data,
        });
      })
      .catch((error) => {
        res.status(500).send({
          success: false,
          message:
            error.message || "Some error occurred while adding the Restaurant.",
        });
      });
  });
});

router.put("/profileimg/:id", async (req, res) => {
  console.log("put from restuaranrt req");
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const target_file = req.files.img;
  const filename = req.body.id + "_profile_pic_" + target_file.name;
  const uploadPath = "./static/profile_pic/" + filename;
  target_file.mv(uploadPath, (err) => {
    if (err)
      res.send({
        success: false,
        massage: "Issues with file",
      });
  });

  await Restaurant.findByIdAndUpdate(
    req.params.id,
    { imgurl: filename },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .then((resta) => {
      res.send({
        success: true,
        massage: "Successfully Updated",
      });
    })
    .catch((error) => {
      res.send({
        success: false,
        massage:
          "Something went wrong while updating please check restaurant id" ||
          error.massage,
      });
    });
});

router.put("/edit/:id", async (req, res) => {
  console.log("put from restuaranrt req");
  const entries = Object.keys(req.body);
  const updates = {};
  for (let i = 0; i < entries.length; i++) {
    updates[entries[i]] = Object.values(req.body)[i];
  }
  await Restaurant.findByIdAndUpdate(
    req.params.id,
    { $set: updates },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .then((resta) => {
      res.send({
        success: true,
        massage: "Successfully Updated",
      });
    })
    .catch((error) => {
      res.send({
        success: false,
        massage:
          "Something went wrong while updating please check restaurant id" ||
          error.massage,
      });
    });
});
router.put("/changepassword/:id", async (req, res) => {
  console.log("put from restuaranrt req");
  bcrypt.hash(req.body.password, saltRounds, (error, hash) => {
    if (error) {
      return res.send(error);
    }
    Restaurant.findByIdAndUpdate(
      req.params.id,
      { password: hash },
      {
        new: true,
        useFindAndModify: false,
      }
    )
      .then((resta) => {
        res.send({
          success: true,
          massage: "Successfully Updated",
        });
      })
      .catch((error) => {
        res.send({
          success: false,
          massage:
            "Something went wrong while updating please check restaurant id" ||
            error.massage,
        });
      });
  });
});
router.post("/login", async (req, res) => {
  Restaurant.findOne({ mobile: req.body.mobile })
    .then((data) => {
      if (data) {
        bcrypt.compare(req.body.password, data.password, (err, result) => {
          if (result) {
            res.send({
              success: true,
              massage: "Login successful",
              data: data,
            });
          } else {
            res.send({
              success: false,
              massage: "Invalid password",
            });
          }
        });
      } else {
        res.send({
          success: false,
          massage: "Please Signin first",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/:id", (req, res) => {
  console.log("DELETE REQ");
  Restaurant.findByIdAndDelete(req.params.id, { useFindAndModify: false })
    .then((data) => {
      res.send({
        success: true,
        massage: "Successfully Deleted",
      });
    })
    .catch((error) => {
      res.send({
        success: false,
        massage:
          "Something went wrong while deleting please check restaurant id" ||
          error.massage,
      });
    });
});

module.exports = router;

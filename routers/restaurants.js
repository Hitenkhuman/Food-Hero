const express = require("express");
const fileUpload = require("express-fileupload");
const bcrypt = require("bcrypt");
const router = express.Router();
const config = require("../config");
const Restaurant = require("../models/restaurant");
//const { Restaurant } = require("../models/models");
const saltRounds = 10;
router.get("/", async (req, res) => {
  await Restaurant.find({ isVerified: true })
    .then((restaurants) => {
      if (restaurants.length > 0)
        res.send({
          success: true,
          massage: "Data found",
          data: restaurants,
        });
      else
        res.send({
          success: false,
          massage: "No restaurants are available in database",
          data: null,
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({
        success: false,
        massage:
          error.massage || "Something went wrong while retrieving Restaurants",
        data: null,
      });
    });
});

router.get("/:id", async (req, res) => {
  await Restaurant.findById(req.params.id)
    .then((restaurants) => {
      res.send({
        success: true,
        massage: "Data found",
        data: restaurants,
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage:
          error.massage ||
          "Something went wrong while retrieving Restaurants please check restaurant id",
        data: null,
      });
      console.log(error);
    });
});

router.get("/mobile/:mobile", async (req, res) => {
  await Restaurant.findOne({ mobile: req.params.mobile })
    .then((restaurant) => {
      if (restaurant)
        res.send({
          success: false,
          massage: "Try with diffrent number",
          data: null,
        });
      else {
        res.send({
          success: true,
          massage: "Available",
          data: null,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage:
          error.massage ||
          "Something went wrong while retrieving Restaurants please check restaurant id",
        data: null,
      });
      console.log(error);
    });
});

router.get("/email/:emailid", async (req, res) => {
  await Restaurant.findOne({ email: req.params.emailid })
    .then((restaurant) => {
      if (restaurant)
        res.send({
          success: false,
          massage: "Try with diffrent email id",
          data: null,
        });
      else {
        res.send({
          success: true,
          massage: "Available",
          data: null,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage:
          error.massage ||
          "Something went wrong while retrieving Restaurants please check restaurant id",
        data: null,
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
          massage: "Data found",
          data: restaurant,
        });
      } else {
        res.status(100).json({
          success: false,
          massage: "Data not found",
          data: null,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage:
          error.massage ||
          "Something went wrong while retrieving token please check restaurant id",
        data: null,
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
          data: null,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage:
          error.massage ||
          "Something went wrong while retrieving token please check restaurant id",
        data: null,
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
        massage: "Data found",
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
        data: null,
      });
      console.log(error);
    });
});

// router.post("/add", async (req, res) => {
//   console.log("post req");
//   let filename = "";
//   if (req.files.img) {
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).send("No files were uploaded.");
//     }

//     const target_file = req.files.img;
//     filename = req.body.authid + "_profile_pic_" + target_file.name;
//     const uploadPath = "./static/profile_pic/" + filename;
//     target_file.mv(uploadPath, (err) => {
//       if (err)
//         res.send({
//           success: false,
//           massage: "Issues with file",
//           data: null,
//         });
//     });
//   }
//   bcrypt.hash(req.body.password, saltRounds, (error, hash) => {
//     if (error) {
//       return res.send(error);
//     }
//     const restaurant = new Restaurant({
//       name: req.body.name,
//       mobile: req.body.mobile,
//       email: req.body.email,
//       password: hash,
//       imgurl: filename,
//       opening_time: req.body.opening_time,
//       closing_time: req.body.closing_time,
//       state: req.body.state,
//       district: req.body.district,
//       address: req.body.address,
//       devicetoken: req.body.devicetoken,
//       authid: req.body.authid,
//       city: req.body.city,
//     });
//     restaurant
//       .save()
//       .then((data) => {
//         res.send({
//           success: true,
//           massage: "Successfully Added",
//           data: data,
//         });
//       })
//       .catch((error) => {
//         res.status(500).send({
//           success: false,
//           massage:
//             error.message || "Some error occurred while adding the Restaurant.",
//           data: null,
//         });
//       });
//   });
// });

router.post("/add", async (req, res) => {
  console.log("post req");
  let filename = "";
  if (req.files.img) {
    if (!req.files || Object.keys(req.files).length === 0) {
      filename = req.body.mobile + "_profile_pic_" + "default.jpg";
    } else {
      const target_file = req.files.img;
      filename = req.body.mobile + "_profile_pic_" + target_file.name;
      const uploadPath = "./static/profile_pic/" + filename;
      target_file.mv(uploadPath, (err) => {
        if (err) {
          console.log(err);
          res.send({
            success: false,
            massage: "Issue with file try again",
            data: err,
          });
        }
      });
    }
  } else {
    filename = req.body.mobile + "_profile_pic_" + "default.jpg";
  }
  const restaurant = new Restaurant({
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    password: req.body.password,
    imgurl: filename,
    opening_time: req.body.opening_time,
    closing_time: req.body.closing_time,
    state: req.body.state,
    district: req.body.district,
    address: req.body.address,
    devicetoken: req.body.devicetoken,
    authid: req.body.authid,
    city: req.body.city,
  });
  restaurant
    .save()
    .then((data) => {
      res.send({
        success: true,
        massage: "Successfully Added",
        data: [data],
      });
    })
    .catch((error) => {
      console.log(error);
      res.send({
        success: false,
        massage:
          error.message || "Some error occurred while adding the Restaurant.",
        data: null,
      });
    });
});

router.post("/edit", async (req, res) => {
  console.log("post edit req");
  let filename = "";
  if (req.files.img != null) {
    if (!req.files || Object.keys(req.files).length === 0) {
      filename = req.body.email + "_profile_pic_" + "default.jpg";
    } else {
      const target_file = req.files.img;
      filename = req.body.email + "_profile_pic_" + target_file.name;
      const uploadPath = "./static/profile_pic/" + filename;
      target_file.mv(uploadPath, (err) => {
        if (err) {
          console.log(err);
          res.send({
            success: false,
            massage: "Issue with file try again",
            data: err,
          });
        }
      });
    }
  } else {
    filename = req.body.email + "_profile_pic_" + "default.jpg";
  }
  await Restaurant.findByIdAndUpdate(
    req.body.id,
    {
      name: req.body.name,
      email: req.body.email,
      imgurl: filename,
      opening_time: req.body.opening_time,
      closing_time: req.body.closing_time,
      state: req.body.state,
      district: req.body.district,
      address: req.body.address,
      city: req.body.city,
    },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .then((resta) => {
      res.send({
        success: true,
        massage: "Successfully Updated",
        data: [resta],
      });
    })
    .catch((error) => {
      console.log("test", error);
      res.send({
        success: false,
        massage:
          "Something went wrong while updating please check restaurant id" ||
          error.massage,
        data: null,
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
        data: null,
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
        data: null,
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
        data: null,
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
router.post("/changepassword/", async (req, res) => {
  console.log("put from restuaranrt req");

  Restaurant.findByIdAndUpdate(
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
        data: [data],
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

router.put("/reject/:id", async (req, res) => {
  console.log("put from restaurant req");
  await Restaurant.findByIdAndUpdate(
    req.params.id,
    { isVerified: false },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .then((restaurant) => {
      res.send({
        success: true,
        massage: "Successfully Updated",
        data: [restaurant],
      });
    })
    .catch((error) => {
      res.send({
        success: false,
        massage:
          "Something went wrong while updating please check ngo id" ||
          error.massage,
        data: null,
      });
    });
});
// router.post("/login", async (req, res) => {
//   Restaurant.findOne({ mobile: req.body.mobile })
//     .then((data) => {
//       if (data) {
//         bcrypt.compare(req.body.password, data.password, (err, result) => {
//           if (result) {
//             res.send({
//               success: true,
//               massage: "Login successful",
//               data: data,
//             });
//           } else {
//             res.send({
//               success: false,
//               massage: "Invalid password",
//               data: null,
//             });
//           }
//         });
//       } else {
//         res.send({
//           success: false,
//           massage: "Please Signin first",
//           data: null,
//         });
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

router.post("/login", async (req, res) => {
  console.log(req.body);
  Restaurant.findOne({ mobile: req.body.mobile })
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
          massage: "Please Signin first",
          data: null,
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
        data: null,
      });
    })
    .catch((error) => {
      res.send({
        success: false,
        massage:
          "Something went wrong while deleting please check restaurant id" ||
          error.massage,
        data: null,
      });
    });
});

module.exports = router;

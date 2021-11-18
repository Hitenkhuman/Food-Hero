const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Ngo = require("../models/ngo");
const config = require("../config");
//const { Ngo } = require("../models/models");
const saltRounds = 10;

router.get("/", async (req, res) => {
  await Ngo.find({ verification_status: "Verified" })
    .then((ngos) => {
      if (ngos) res.json({ success: true, massage: "Data found", data: ngos });
      else
        res.send({
          success: false,
          massage: "No Ngos are available in database",
          data: null,
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({
        success: false,
        massage: error.massage || "Something went wrong while retrieving ngos",
        data: null,
      });
    });
});

router.get("/verification", async (req, res) => {
  await Ngo.find({ verification_status: "Pending" })
    .then((ngos) => {
      if (ngos) res.json({ success: true, massage: "Data found", data: ngos });
      else
        res.send({
          success: false,
          massage: "No Ngos are available in database",
          data: null,
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({
        success: false,
        massage: error.massage || "Something went wrong while retrieving ngos",
        data: null,
      });
    });
});

router.get("/:id", async (req, res) => {
  await Ngo.findById(req.params.id)
    .then((ngos) => {
      res.send({
        success: true,
        massage: "Data found",
        data: ngos,
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage:
          error.massage ||
          "Something went wrong while retrieving ngos please check ngo id",
        data: null,
      });
      console.log(error);
    });
});

router.get("/mobile/:mobile", async (req, res) => {
  await Ngo.findOne({ mobile: req.params.mobile })
    .then((ngo) => {
      if (ngo)
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
          "Something went wrong while retrieving ngos please check ngo id",
        data: null,
      });
      console.log(error);
    });
});

router.get("/email/:emailid", async (req, res) => {
  await Ngo.findOne({ email: req.params.emailid })
    .then((ngo) => {
      if (ngo)
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
          "Something went wrong while retrieving ngos please check ngo id",
        data: null,
      });
      console.log(error);
    });
});

router.get("/device/all", async (req, res) => {
  await Ngo.find()
    .select({ devicetoken: 1 })
    .then((ngo) => {
      if (ngo) {
        res.send({
          success: true,
          massage: "Data found",
          data: ngo,
        });
      } else {
        res.status(100).json({
          success: false,
          massage: "No ngo are available",
          data: null,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage:
          error.massage ||
          "Something went wrong while retrieving token please check ngo id",
        data: null,
      });
      console.log(error);
    });
});

router.get("/device/:id", async (req, res) => {
  await Ngo.findById(req.params.id)
    .then((ngo) => {
      if (ngo) {
        res.json({
          success: true,
          massage: "Data Found",
          data: {
            devicetoken: ngo.devicetoken,
            name: ngo.name,
            _id: ngo._id,
          },
        });
      } else {
        res.status(100).json({
          success: false,
          massage: "No ngo are available",
          data: null,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage:
          error.massage ||
          "Something went wrong while retrieving token please check ngo id",
        data: null,
      });
      console.log(error);
    });
});

router.get("/status/:id", async (req, res) => {
  await Ngo.findById(req.params.id)
    .select({ name: 1, verification_status: 1 })
    .then((ngo) => {
      if (ngo) {
        res.json({
          success: true,
          status: ngo.verification_status,
          name: ngo.name,
          _id: ngo._id,
        });
      } else {
        res.status(100).json({
          success: false,
          massage: "Not Found",
          data: null,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage:
          error.massage ||
          "Something went wrong while retrieving token please check ngo id",
        data: null,
      });
      console.log(error);
    });
});

router.get("/profileimg/:id", async (req, res) => {
  await Restaurant.findById(req.params.id)
    .select({ imgurl: 1 })
    .then((ngos) => {
      res.send({
        success: true,
        massage: "Data found",
        data: {
          _id: ngos._id,
          imgurl: config.img_path + ngos.imgurl,
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
          data: null,
        });
    });
  }
  bcrypt.hash(req.body.password, saltRounds, (error, hash) => {
    if (error) {
      return res.send(error);
    }
    const ngo = new Ngo({
      name: req.body.name,
      mobile: req.body.mobile,
      certificate_number: req.body.certificate_number,
      email: req.body.email,
      password: hash,
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
    ngo
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
          massage:
            error.message || "Some error occurred while adding the Restaurant.",
          data: null,
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
        data: null,
      });
  });

  await Ngo.findByIdAndUpdate(
    req.params.id,
    { imgurl: filename },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .then((data) => {
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
  await Ngo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
  })
    .then((ngo) => {
      res.send({
        success: true,
        massage: "Successfully Updated",
        data: ngo,
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

router.put("/verify/:id", async (req, res) => {
  console.log("put from ngo req");
  await Ngo.findByIdAndUpdate(
    req.params.id,
    { verification_status: "Verified" },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .then((ngo) => {
      res.send({
        success: true,
        massage: "Successfully Updated",
        data: [ngo],
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

router.put("/reject/:id", async (req, res) => {
  console.log("put from ngo req");
  await Ngo.findByIdAndUpdate(
    req.params.id,
    { verification_status: "Rejected" },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .then((ngo) => {
      res.send({
        success: true,
        massage: "Successfully Updated",
        data: [ngo],
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

router.put("/changepassword/:id", async (req, res) => {
  console.log("put from restuaranrt req");
  bcrypt.hash(req.body.password, saltRounds, (error, hash) => {
    if (error) {
      return res.send(error);
    }
    Ngo.findByIdAndUpdate(
      req.params.id,
      { password: hash },
      {
        new: true,
        useFindAndModify: false,
      }
    )
      .then((data) => {
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
});

router.post("/login", async (req, res) => {
  Ngo.findOne({ mobile: req.body.mobile })
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
              data: null,
            });
          }
        });
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
  Ngo.findByIdAndDelete(req.params.id, { useFindAndModify: false })
    .then((data) => {
      res.send({
        success: true,
        massage: "Successfully Deleted",
        data: null,
      });
    })
    .catch((error) => {
      res.send({
        success: true,
        massage:
          "Something went wrong while deleting please check ngo id" ||
          error.massage,
        data: null,
      });
    });
});

module.exports = router;

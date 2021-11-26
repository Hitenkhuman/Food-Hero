const express = require("express");
const router = express.Router();
const Food = require("../models/food");
const Restaurant = require("../models/restaurant");
//const { Food, Restaurant } = require("../models/models");

//available food list for ngos
router.get("/available", async (req, res) => {
  await Food.find({ food_status: "Available" })
    .populate("res_id")
    .then((foods) => {
      if (foods)
        res.send({
          success: true,
          massage: "Data Found",
          data: foods,
        });
      else
        res.status(100).send({
          success: false,
          massage: "No Foods are available in database",
        });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage: error.massage || "Something went wrong while retrieving Foods",
      });
    });
});

router.get("/available/:city", async (req, res) => {
  await Food.find({ food_status: "Available", city: req.params.city })
    .populate("res_id")
    .populate("ngo_id")
    .populate("requests")
    .then((foods) => {
      if (foods)
        res.send({
          success: true,
          massage: "Data Found",
          data: foods,
        });
      else
        res.status(100).send({
          success: false,
          massage: "No Foods are available in database",
        });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage: error.massage || "Something went wrong while retrieving Foods",
      });
    });
});

//food list at particular restaurant
// router.get("/available/:city", async (req, res) => {
//   console.log("city request");
//   var response = new Array();
//   await Restaurant.find({ city: req.params.city })
//     .then((restaurants) => {
//       // res.send(restaurants);

//       restaurants.map((element) => {
//         Food.find({ res_id: element._id, food_status: "Available" })
//           .populate("res_id")
//           .populate("ngo_id")
//           .then((foods) => {
//             //console.log(foods);
//             // // if(foods.length>0){}
//             response.push(foods);
//           })
//           .catch((error) => {
//             res.status(500).send({
//               success: false,
//               massage:
//                 error.massage || "Something went wrong while retrieving Foods",
//             });
//           });
//       });
//       console.log(response);
//       if (response) {
//         res.send({
//           success: true,
//           massage: "Data Found",
//           data: response,
//         });
//       }
//     })
//     .catch((error) => {
//       res.status(500).send({
//         success: false,
//         massage:
//           error.massage ||
//           "Something went wrong while retrieving Restaurants in this city",
//         data: null,
//       });
//       console.log(error);
//     });
// });

router.get("/history", async (req, res) => {
  console.log("all req");
  await Food.find({ food_status: "Delivered" })
    .populate("res_id")
    .populate("ngo_id")
    .then((foods) => {
      if (foods) {
        res.send({
          success: true,
          massage: "Data Found",
          data: foods,
        });
      } else
        res.status(100).send({
          success: false,
          massage: "No Foods are available in database",
        });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage: error.massage || "Something went wrong while retrieving Foods",
      });
    });
});

router.get("/history/ngo/:id", async (req, res) => {
  console.log("history req");
  await Food.find({ ngo_id: req.params.id, food_status: "Delivered" })
    .populate("res_id")
    .populate("ngo_id")
    .then((foods) => {
      if (foods) {
        res.send({
          success: true,
          massage: "Data Found",
          data: foods,
        });
      } else
        res.status(100).send({
          success: false,
          massage: "No Foods are available in database",
        });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage: error.massage || "Something went wrong while retrieving Foods",
      });
    });
});

router.get("/history/restaurant/:id", async (req, res) => {
  console.log("history req");
  await Food.find({ res_id: req.params.id, food_status: "Delivered" })
    .populate("res_id")
    .populate("ngo_id")
    .then((foods) => {
      if (foods) {
        res.send({
          success: true,
          massage: "Data Found",
          data: foods,
        });
      } else
        res.status(100).send({
          success: false,
          massage: "No Foods are available in database",
        });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage: error.massage || "Something went wrong while retrieving Foods",
      });
    });
});

router.get("/ngo/:id/:city", async (req, res) => {
  console.log("ngo req");
  await Food.find({
    //ngo_id: req.params.id,
    food_status: "Available",
    city: req.params.city,
    requests: { $ne: req.params.id },
  })
    .populate("res_id")
    .populate("ngo_id")
    .then((foods) => {
      if (foods)
        res.send({
          success: true,
          massage: "Data Found",
          data: foods,
        });
      else
        res.status(100).send({
          success: false,
          massage: "No Foods are available in database",
          data: null,
        });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage: error.massage || "Something went wrong while retrieving Foods",
        data: null,
      });
    });
});

router.get("/restaurant/:id", async (req, res) => {
  console.log("checking for food");
  await Food.find({ res_id: req.params.id, food_status: "Available" })
    .populate("res_id")
    .then((foods) => {
      if (foods.length)
        res.send({
          success: true,
          massage: "Data Found",
          data: foods,
        });
      else
        res.status(100).send({
          success: false,
          massage: "No Foods are available in database",
          data: null,
        });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage: error.massage || "Something went wrong while retrieving Foods",
      });
    });
});

router.get("/:id", async (req, res) => {
  await Food.findById(req.params.id)
    .populate("res_id")
    .populate("ngo_id")
    .then((food) => {
      res.send({
        success: true,
        massage: "Data Found",
        data: food,
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage: error.massage || "Something went wrong while retrieving Foods",
      });
      console.log(error);
    });
});

router.get("/status/:id", async (req, res) => {
  await Food.findById(req.params.id)
    .select({ status: 1 })
    .then((food) => {
      if (food) {
        res.json({
          success: true,
          status: food.status,
          _id: food._id,
        });
      } else {
        res.status(100).json({
          success: false,
          massage: "Food is not available",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage:
          error.massage ||
          "Something went wrong while retrieving token please check ngo id",
      });
      console.log(error);
    });
});

router.post("/", async (req, res) => {
  console.log("post req");
  const food = new Food(req.body);
  await food
    .save()
    .then((data) => {
      res.send({
        success: true,
        massage: "Successfully Inserted",
        data: [data],
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message:
          error.message || "Some error occurred while creating the Food.",
      });
    });
});

router.put("/edit/:id", async (req, res) => {
  console.log("put from Food req");
  await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
  })
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
        massage: "Something went wrong while updating" || error.massage,
      });
    });
});

router.put("/pickuptime/:id", async (req, res) => {
  console.log("put from Food req");
  let dt = new Date(Date.now());
  const time = dt.getHours() + ":" + dt.getMinutes();
  await Food.findByIdAndUpdate(
    req.params.id,
    { pickup_time: time, food_status: "Delivered" },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .then((data) => {
      Request.updateMany(
        { food_id: req.params.id },
        { request_status: "Delivered" },
        { new: true, useFindAndModify: false }
      )
        .then((data) => {
          res.send({
            success: true,
            massage: "Successfully Updated",
            data: [data],
          });
        })
        .catch((error) => {
          console.log("error1", error);
          res.send({
            success: false,
            massage: "Something went wrong while updating" || error.massage,
          });
        });
    })
    .catch((error) => {
      console.log("error2", error);
      res.send({
        success: false,
        massage: "Something went wrong while updating" || error.massage,
      });
    });
});

router.delete("/:id", (req, res) => {
  console.log("DELETE REQ");
  Food.findByIdAndDelete(req.params.id, { useFindAndModify: false })
    .then((data) => {
      res.send({
        success: true,
        massage: "Successfully Deleted",
      });
    })
    .catch((error) => {
      res.send({
        success: false,
        massage: "Something went wrong while deleting" || error.massage,
      });
    });
});

module.exports = router;

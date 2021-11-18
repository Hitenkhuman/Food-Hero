const express = require("express");
const router = express.Router();
const Request = require("../models/request");
const Food = require("../models/food");

//const { Request } = require("../models/models");

router.get("/:id", async (req, res) => {
  await Request.findById(req.params.id)
    .then((request) => {
      res.send({
        success: true,
        massage: "Data Found",
        data: request,
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage:
          error.massage ||
          "Something went wrong while retrieving Restaurants please check request id",
      });
      console.log(error);
    });
});

//for restaurant to check details
router.get("/all/:id", async (req, res) => {
  await Request.find({ food_id: req.params.id })
    .populate("ngo_id")
    .populate("res_id")
    .populate("food_id")
    .then((request) => {
      res.send({
        success: true,
        massage: "Data Found",
        data: request,
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage:
          error.massage ||
          "Something went wrong while retrieving Restaurants please check food id",
      });
      console.log(error);
    });
});

//ngo request menu code to see its status
router.get("/req/:id", async (req, res) => {
  await Request.find({
    ngo_id: req.params.id,
    request_status: "Accepted",
  })
    .populate("res_id")
    .populate("ngo_id")
    .populate("food_id")
    .then((request) => {
      res.send({
        success: true,
        massage: "Data Found",
        data: request,
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage:
          error.massage ||
          "Something went wrong while retrieving Restaurants please check request id",
      });
      console.log(error);
    });
});
// router.get("/req/:id", async (req, res) => {
//   await Request.find({
//     ngo_id: req.params.id,
//     request_status: "Accepted",
//   })
//     .populate({
//       path: "food_id",
//       populate: {
//         path: "res_id",
//       },
//     })
//     .then((request) => {
//       res.send({
//         success: true,
//         massage: "Data Found",
//         data: request,
//       });
//     })
//     .catch((error) => {
//       res.status(500).send({
//         success: false,
//         massage:
//           error.massage ||
//           "Something went wrong while retrieving Restaurants please check request id",
//       });
//       console.log(error);
//     });
// });

//to add foood request by ngo
router.post("/add", async (req, res) => {
  console.log("post req");

  const request = new Request(req.body);
  await request
    .save()
    .then((data) => {
      console.log("request saved");
      Food.findByIdAndUpdate(
        { _id: req.body.food_id },
        {
          $push: { requests: data._id },
        },
        { useFindAndModify: false }
      )
        .then((data1) => {
          console.log("food updated");
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
            massage:
              "Something went wrong while updating please check request id" ||
              error.massage,
            data: null,
          });
        });
    })
    .catch((error) => {
      console.log("error2", error);
      res.send({
        success: false,
        massage: "Already sent.",
        data: null,
      });
    });
});

//after selecting specific ngo set value of status to accepted
router.put("/edit/:id", async (req, res) => {
  await Request.findOneAndUpdate(
    { food_id: req.params.id },
    { request_status: "Accepted" },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .then((data) => {
      //here add code for update food data make ngo to data.ngo by seraching food id
      Food.findByIdAndUpdate(
        req.params.id,
        { ngo_id: data.ngo_id, food_status: "Occupied" },
        {
          new: true,
          useFindAndModify: false,
        }
      )
        .then((data1) => {
          res.send({
            success: true,
            massage: "Successfully Updated",
            data: [data],
          });
        })
        .catch((error) => {
          res.status(500).send({
            success: false,
            massage:
              "Something went wrong while updating please check request id" ||
              error.massage,
          });
          console.log(error);
        });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        massage:
          "Something went wrong while updating please check request id" ||
          error.massage,
      });
    });
});

module.exports = router;

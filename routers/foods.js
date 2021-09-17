const express = require("express");
const router = express.Router();
const Food = require("../models/food");
// const Restaurant = require("../models/restaurant");
//const { Food, Restaurant } = require("../models/models");

//available food list for ngos
router.get("/available", async (req, res) => {
  await Food.find({ status: "Available" })
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

//food list at particular restaurant
router.get("/available/:id", async (req, res) => {
  await Food.find({ res_id: req.params.id, status: "Available" })
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

router.get("/all", async (req, res) => {
  await Food.find()
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

router.get("/:id", async (req, res) => {
  await Food.findById(req.params.id)
    .populate("res_id")
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

router.post("/add", async (req, res) => {
  console.log("post req");
  const food = new Food(req.body);
  await food
    .save()
    .then((data) => {
      res.send({
        success: true,
        massage: "Successfully Inserted",
        data: data,
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

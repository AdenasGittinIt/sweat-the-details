const express = require("express");
const router = express.Router();
const Workout = require("../models/workout.js");
const path = require("path");

router.get("/exercise", ({ body }, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", ({ body }, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

router.get("/api/workouts/range", ({ body }, res) => {
  Workout.find({}).then(dbWorkout => {
    res.json(dbWorkout);
  });
});

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      console.log(dbWorkout._id);
      console.log(body);

      Workout.findOneAndUpdate(
        { _id: dbWorkout._id },
        { $push: { exercises: body } },
        function(error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
            res.json(dbWorkout);
          }
        }
      );
    })

    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", ({ params, body }, res) => {
  Workout.findOneAndUpdate(
    { _id: params.id },
    { $push: { exercises: body } },
    function(error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
        res.json(success);
      }
    }
  );
})

router.post("/api/workout/bulk", ({ body }, res) => {
  Workout.insertMany(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;

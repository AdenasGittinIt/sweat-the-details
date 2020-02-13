const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workouts")

Workout.find(function (err, workouts) {
  if (err) return console.error(err);
  console.log(workouts);
})


router.post("/api/workout" , ({ body }, res) => {
  Workout.create(body)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

router.post("/api/workout/bulk", ({ body }, res) => {
  Workout.insertMany(body)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});


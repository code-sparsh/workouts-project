const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        requird: true
    }
},{timestamps : true});

module.exports = mongoose.model("Workout", WorkoutSchema);
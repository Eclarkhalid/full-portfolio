const { Schema, models, model } = require("mongoose");

const AboutSchema = new Schema({
  aboutValue: {type: String, required: true},
});

export const About = models?.About || model('About', AboutSchema);
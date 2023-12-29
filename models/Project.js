const { Schema, models, model } = require("mongoose");

const ProjectSchema = new Schema({
  title: String,
  details: String,
  date: String,
  image: [String],
  projectUrl: String,
  gitUrl: String,
  technologies: String,
});

export const Project = models?.Project || model('Project', ProjectSchema)
/**
 * Model Index File
 *
 * This file exports all models from one place.
 * Makes importing easier: const { User, Story, Comment } = require('./models');
 */

const User = require("./User");
const Story = require("./Story");
const Comment = require("./Comment");

module.exports = {
  User,
  Story,
  Comment,
};

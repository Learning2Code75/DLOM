const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Taskboard = new Schema(
  {
    operation_type: {
      name: String,
      link: String,
    },
    description: String,
    status: String,
    responses: [
      {
        user_data: { type: Schema.Types.ObjectId, ref: "user" },
        description: String,
        timestamp: String,
      },
    ],
    suggestions: [
      {
        user_data: { type: Schema.Types.ObjectId, ref: "user" },
        description: String,
        timestamp: String,
      },
    ],
    task_assigned_to: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("taskboard", Taskboard);

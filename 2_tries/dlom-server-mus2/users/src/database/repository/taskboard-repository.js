const { TaskboardModel } = require("../models");
const { APIError, BadRequestError } = require("../../utils/app-errors");
const mongoose = require("mongoose");
const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

//Dealing with data base operations

class TaskboardRepository {
  async CreateTask({
    operation_type,
    description,
    status,
    responses,
    suggestions,
    task_assigned_to,
  }) {
    try {
      const task = await TaskboardModel.create({
        operation_type,
        description,
        status,
        responses,
        suggestions,
        task_assigned_to,
      });
      return task;
    } catch (err) {
      throw APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Task"
      );
    }
  }
  async Tasks() {
    try {
      return await TaskboardModel.find().populate([
        { path: "responses", populate: { path: "user_data", model: "user" } },
        { path: "suggestions", populate: { path: "user_data", model: "user" } },
        { path: "task_assigned_to", model: "user" },
      ]);
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Tasks"
      );
    }
  }

  async UpdateTask(_id, task) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new APIError(
        "API Error",
        STATUS_CODES.NOT_FOUND,
        "No task with that id"
      );
    }
    try {
      console.log("rep task", task);
      const updatedTask = await TaskboardModel.findByIdAndUpdate(
        _id,
        { ...task, _id },
        { new: true }
      );
      return updatedTask;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Error Updating the task"
      );
    }
  }

  async DeleteTask(_id) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new APIError(
        "API Error",
        STATUS_CODES.NOT_FOUND,
        "No task with that id"
      );
    }
    console.log(_id);
    await TaskboardModel.findByIdAndRemove(_id);
    return { message: "Task deleted successfully" };
  }
}

module.exports = TaskboardRepository;

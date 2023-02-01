const { TaskboardRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require("../utils/app-errors");

// All Business logic will be here
class TaskboardService {
  constructor() {
    this.repository = new TaskboardRepository();
  }

  async GetTasks() {
    try {
      const tasks = await this.repository.Tasks();

      return FormateData({
        tasks,
      });
    } catch (err) {
      throw new APIError("Tasks Not found");
    }
  }

  async CreateTask({
    operation_type,
    description,
    status,
    responses,
    suggestions,
    task_assigned_to,
  }) {
    try {
      const taskResult = await this.repository.CreateTask({
        operation_type,
        description,
        status,
        responses,
        suggestions,
        task_assigned_to,
      });
      return FormateData(taskResult);
    } catch (err) {
      throw new APIError("Unable to create task");
    }
  }

  async UpdateTask(taskInputs) {
    let { _id, task } = taskInputs;
    try {
      const taskResult = await this.repository.UpdateTask(_id, task);
      return FormateData(taskResult);
    } catch (err) {
      throw new APIError("Task Not updated");
    }
  }

  async DeleteTask(taskInputs) {
    let { _id } = taskInputs;
    try {
      console.log(_id);
      const taskResult = await this.repository.DeleteTask(_id);
      return FormateData(taskResult);
    } catch (err) {
      throw new APIError("Task Not deleted");
    }
  }
}

module.exports = TaskboardService;

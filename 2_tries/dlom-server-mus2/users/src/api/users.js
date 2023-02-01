const TaskboardService = require("../services/taskboard-service");
const UserService = require("../services/user-service");

module.exports = (app) => {
  const service = new UserService();
  const tasks_service = new TaskboardService();

  // GET /users : getUsers
  app.get("/users", async (req, res, next) => {
    try {
      const { data } = await service.GetUsers();
      return res.status(200).json(data.users);
    } catch (err) {
      next(err);
    }
  });

  // POST /users/signin : signin
  app.post("/users/signin", async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const existingUser = await service.CheckExistingUser({ email });

      if (!existingUser) {
        return res.status(404).json({ message: "user dne" });
      }

      const isPasswordCorrect = await service.CheckPasswordCorrectness(
        password,
        existingUser.password
      );

      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "invalid credentials" });
      }

      const token = service.SignLoginToken(existingUser);

      res.status(200).json({ result: existingUser, token });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    }
  });

  //PATCH /users : updateUser
  app.patch("/users", async (req, res, next) => {
    try {
      console.log(req.body);
      const { id: _id } = req.body;
      const user = req.body.data;

      const { email, password, cpassword } = user;
      const existingUser = await service.CheckExistingUser({ email });

      let hashedPassword = "";
      if (password) {
        let comparePass = service.CheckPasswords({ password, cpassword });
        if (comparePass) {
          return res.status(400).json({ message: "passwords dont match" });
        }
        hashedPassword = await service.HashPassword({ password });
      } else {
        hashedPassword = existingUser.password;
      }

      const { data } = await service.UpdateUser({ _id, user, hashedPassword });
      return res.json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  });

  //DELETE /users : deleteUser
  app.delete("/users/:id", async (req, res, next) => {
    try {
      const { id: _id } = req.params;
      console.log(req.params);
      const { data } = await service.DeleteUser({ _id });
      return res.json(data);
    } catch (err) {
      console.log(err);

      next(err);
    }
  });

  // POST /users/signup : signup
  app.post("/users/signup", async (req, res, next) => {
    const { email, password, cpassword, firstName, lastName, userRole } =
      req.body;
    try {
      const existingUser = await service.CheckExistingUser({ email });
      if (existingUser) {
        return res.status(400).json({ message: "user already exists" });
      }
      let comparePass = service.CheckPasswords({ password, cpassword });
      if (comparePass) {
        return res.status(400).json({ message: "passwords dont match" });
      }

      const hashedPassword = await service.HashPassword({ password });

      const result = await service.CreateUser({
        email,
        password,
        hashedPassword,
        firstName,
        lastName,
        userRole,
      });

      const token = service.SignToken(result);

      res.status(200).json({ result, token });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    }
  });

  //taskboard
  // GET /tasks : getTasks
  app.get("/users/tasks", async (req, res, next) => {
    try {
      const { data } = await tasks_service.GetTasks();
      return res.status(200).json(data.tasks);
    } catch (err) {
      next(err);
    }
  });

  //POST /tasks : createTask
  app.post("/users/tasks", async (req, res, next) => {
    const {
      operation_type,
      description,
      status,
      responses,
      suggestions,
      task_assigned_to,
    } = req.body;
    try {
      const result = await tasks_service.CreateTask({
        operation_type,
        description,
        status,
        responses,
        suggestions,
        task_assigned_to,
      });

      res.status(200).json({ result });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    }
  });

  //PATCH /tasks : updateTask
  app.patch("/users/tasks", async (req, res, next) => {
    try {
      console.log(req.body);
      const { task_id: _id } = req.body;
      const task = req.body.data;

      const { data } = await tasks_service.UpdateTask({ _id, task });
      return res.json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  });

  //DELETE /users : deleteTask
  app.delete("/users/tasks/:id", async (req, res, next) => {
    try {
      const { id: _id } = req.params;
      console.log(req.params);
      const { data } = await tasks_service.DeleteTask({ _id });
      return res.json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
};

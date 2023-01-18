const UserService = require("../services/user-service");

module.exports = (app) => {
  const service = new UserService();

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
};

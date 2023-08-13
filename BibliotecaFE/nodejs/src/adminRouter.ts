import express from "express";
import { UserRepository } from "./repositories/UserRepository";
import jwt from "jsonwebtoken";
import { jwtSecret } from ".";

export const  adminRouter = express.Router();
// use middleware to verify token
adminRouter.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["x-access-token"] as string;
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  // verifies secret and checks exp
  jwt.verify(token, jwtSecret, function (err: any, decoded: any) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
  });
  next();
});
adminRouter.get("/", function (req, res) {
  res.send("I am the dashboard!");
});
adminRouter.get("/users", async (req, res) => {
  const profiles = await UserRepository.getAllProfiles();
  res.json(profiles);
});

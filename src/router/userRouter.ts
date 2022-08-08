import { Router } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserController } from "../controller/UserController";
import { UserDataBase } from "../data/UserDataBase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGeneration } from "../services/IdGeneretion";
import { NodeMailer } from "../services/NodeMailer";

export const userRouter = Router();
const idGeneration = new IdGeneration()
const hashManager = new HashManager()
const authenticator = new Authenticator()
const userDataBase = new UserDataBase()
const nodeMailer = new NodeMailer()
const userBusiness = new UserBusiness(idGeneration, userDataBase, hashManager, authenticator, nodeMailer)
const userController = new UserController(userBusiness)

userRouter.get("/", (req, res) => userController.readAccountController(req, res))
userRouter.post("/signup", (req, res) => userController.createUserController(req, res))
userRouter.post("/login", (req, res) => userController.loginController(req, res))
userRouter.put("/update", (req, res) => userController.updateAccountUserController(req, res))
userRouter.delete('/delete', (req, res) => userController.deleteAccountUserController(req, res))
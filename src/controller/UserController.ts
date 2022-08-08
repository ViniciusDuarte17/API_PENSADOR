import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { CustomError } from "../error/CustomError";
import { LoginDTO, UsersDTO, UserUpdateDateDTO } from "../types/users";

export class UserController {
    constructor(private userBusiness: UserBusiness) { }

    readAccountController = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization
            const userAccount = await this.userBusiness.readAccountBussines(token)
            res.send({ userAccount })
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send({ message: error.message })
            }
            else if (error) {
                res.status(400).send({ error })
            }
            else {
                res.status(500).send({ message: "error no servidor" })
            }
        }
    }
    
    createUserController = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, email, password } = req.body
            const userDTO: UsersDTO = {
                name,
                email,
                password
            }
            const token = await this.userBusiness.createUserBusiness(userDTO)

            res.status(201).send({ message: `usuário ${name} criado com sucesso!`, token })
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send({ message: error.message })
            }
            else if (error) {
                res.status(400).send({ error })
            }
            else {
                res.status(500).send({ message: "error no servidor" })
            }
        }
    }
    loginController = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body
            const loginDTO: LoginDTO = {
                email,
                password
            }
            const token = await this.userBusiness.loginBusiness(loginDTO)

            res.status(201).send({message: "usuário logado", token })
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send({ message: error.message })
            }
            else if (error) {
                res.status(400).send({ error })
            }
            else {
                res.status(500).send({ message: "error no servidor" })
            }
        }
    }


    updateAccountUserController = async (req: Request, res: Response) => {
     try {
        const token = req.headers.authorization
        const {name, email} = req.body
        const updateUserAccount: UserUpdateDateDTO = {name, email}
        await this.userBusiness.updateAccountUserBussines(token, updateUserAccount)
        res.status(200).send({message: "usuário editado com sucesso!"})

     } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).send({ message: error.message })
        }
        else if (error) {
            res.status(400).send({ error })
        }
        else {
            res.status(500).send({ message: "error no servidor" })
        }
    }
     
    }

    deleteAccountUserController = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization
            await this.userBusiness.deleteAccountUserBussines(token)
            res.status(200).send({message: "conta do usuário deletada com sucesso!"})
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).send({ message: error.message })
            }
            else if (error) {
                res.status(400).send({ error })
            }
            else {
                res.status(500).send({ message: "error no servidor" })
            }
        }
    }

}
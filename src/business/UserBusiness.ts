import { authenticationData } from './../types/authenticationData';
import { IdGeneration } from './../services/IdGeneretion';
import { CustomError } from "../error/CustomError";
import { LoginDTO, UserDateDTO, UsersDTO, UserUpdateDateDTO } from "../types/users";
import { UserDataBase } from '../data/UserDataBase';
import { HashManager } from '../services/HashManager';
import { Authenticator } from '../services/Authenticator';
import { NodeMailer } from '../services/NodeMailer';

export class UserBusiness {
   constructor(private idGeneration: IdGeneration,
      private userDatabase: UserDataBase,
      private hashManager: HashManager,
      private authenticator: Authenticator,
      private nodeMailer: NodeMailer
   ) { }
   createUserBusiness = async (userDTO: UsersDTO): Promise<string> => {
      const { name, email, password } = userDTO
      if (!name || !email || !password) {
         throw new CustomError("verifique se os campos foram preenchidos!", 422)
      }

      const id = this.idGeneration.generationId()
      const newPassword = this.hashManager.createHash(password)
      const userDateDTO: UserDateDTO = {
         id,
         name,
         email,
         password: newPassword
      }
      const payload: authenticationData = {
         id
      }
      await this.userDatabase.insertUser(userDateDTO)
      const token = this.authenticator.generationToken(payload)

      await this.nodeMailer.sendEmailToNewUsers(email, password)

      return token
   }

   loginBusiness = async (loginDTO: LoginDTO): Promise<string> => {
      const { email, password } = loginDTO

      const user = await this.userDatabase.getUserByEmail(email)
      if (!user) {
         throw new CustomError("usuario nao encontrado", 404)
      }
      const compareHash = this.hashManager.compareHash(password, user.password)
      if (!compareHash) {
         throw new CustomError("Credencias inválidas", 401)
      }
      const payload: authenticationData = {
         id: user.id
      }

      const token = this.authenticator.generationToken(payload)
      return token
   }

   readAccountBussines = async (token: string): Promise<UserDateDTO> => {
      if (!token) {
         throw new CustomError("É necessário informar um token de acesso!", 422);
      }
      const tokenData = this.authenticator.getTokenData(token)
      if (!tokenData) {
         throw new CustomError("Usuário Deslogado!", 401)
      }

      const userAccount = await this.userDatabase.getUserById(tokenData.id)
      if (!userAccount) {
         throw new CustomError("Usuário não identificado!", 404)
      }

      if (tokenData.expiredAt) {
         throw new CustomError("Usuário deslogado!", 401);
       }

      return userAccount
   }

   updateAccountUserBussines = async (token: string, UserUpdateDateDTO: UserUpdateDateDTO): Promise<void> => {
      if (!token) {
         throw new CustomError("É necessário informar um token de acesso!", 422);
      }
      const tokenData = this.authenticator.getTokenData(token)

      if (!tokenData) {
         throw new CustomError("Usuário Deslogado!", 401)
      }

      if (tokenData.expiredAt) {
         throw new CustomError("Usuário deslogado!", 401);
       }

      const userAccount = await this.authenticator.getTokenData(tokenData.id)

      if (!userAccount) {
         throw new CustomError("Usuário não identificado!", 404)
      }
      if (
         UserUpdateDateDTO.name === '' ||
         UserUpdateDateDTO.email === ''

      ) {
         throw new CustomError("Nenhum dos campos pode estar em branco", 400)
      }

      if(!UserUpdateDateDTO.name && !UserUpdateDateDTO.email) {
         throw new CustomError("Escolha ao menos um valor para alterar", 400)
      }
      await this.userDatabase.updateUserById(tokenData.id, UserUpdateDateDTO)
   }

   deleteAccountUserBussines = async (token: string): Promise<void> => {
      if (!token) {
         throw new CustomError("É necessário informar um token de acesso!", 422)
      }
      const tokenData = this.authenticator.getTokenData(token)

      if (tokenData.expiredAt) {
         throw new CustomError("Usuário deslogado!", 401);
       }
      await this.userDatabase.deleteUserById(tokenData.id)

   }
}
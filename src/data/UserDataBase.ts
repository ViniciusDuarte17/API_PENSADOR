import { UserDateDTO, UserUpdateDateDTO } from './../types/users';
import {BaseDataBase} from '../data/BaseDataBase'
export class UserDataBase extends BaseDataBase {
    insertUser = async (userDateDTO : UserDateDTO): Promise <void> => {
        await this.getConnection().insert(userDateDTO).into('UsersAccount')
    }
    getUserByEmail = async (email: string): Promise <UserDateDTO> => { 
        const user = await this.getConnection().from('UsersAccount').where({email})
        return user[0]
    }
    getUserById = async (id: string): Promise <UserDateDTO> => { 
        const user = await this.getConnection().select("id","name", "email").from('UsersAccount').where({id})
        return user[0]
    }
    updateUserById =async (id: string, UserUpdateDateDTO: UserUpdateDateDTO ):Promise<void> => {
       await this.getConnection()
       .from('UsersAccount')
       .update({
        name:UserUpdateDateDTO.name,
        email: UserUpdateDateDTO.email
       })
       .where({id})
    }

    deleteUserById = async (id: string): Promise<void> => {
        await this.getConnection().delete().from('UsersAccount').where({id})
    }
}
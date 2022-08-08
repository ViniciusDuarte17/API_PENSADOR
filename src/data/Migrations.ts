
import { BaseDataBase } from "./BaseDataBase";

export class Migrations extends BaseDataBase {
    createTable = () =>
        this.getConnection()
            .raw(
                `
        CREATE TABLE UsersAccount (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) UNIQUE NOT NULL
            );
            
            CREATE TABLE Quotes(
            id VARCHAR(255) PRIMARY KEY,
            phrase TEXT NOT NULL,
            date DATE NOT NULL,
            userId VARCHAR(255) NOT NULL,
            FOREIGN KEY (userId) REFERENCES UsersAccount(id)
            );
            
            CREATE TABLE Likes (
            id VARCHAR(255) PRIMARY KEY,
            userId VARCHAR(255) NOT NULL,
            quotesId VARCHAR(255) NOT NULL,
            FOREIGN KEY (userId) REFERENCES UsersAccount(id),
            FOREIGN KEY (quotesId) REFERENCES Quotes(id)
            );
            
     `
            )
            .then(() => console.log("Tabela criada com sucesso"))
            .catch((error: any) => console.log(error.sqlMessage || error.message));
    closeConnection = () => this.getConnection().destroy();
}

const migrations = new Migrations();
migrations.createTable().finally(migrations.closeConnection);

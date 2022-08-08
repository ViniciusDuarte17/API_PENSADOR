import knex, { Knex } from "knex";
import dotenv from "dotenv";
dotenv.config();
export abstract class BaseDataBase {
  private static connection: Knex | null = null;
  protected getConnection(): Knex {
    if (!BaseDataBase.connection) {
      BaseDataBase.connection = knex({
        client: "mysql",
        connection: {
          host: "35.226.146.116",
          port: 3306,
          user: "4212061-vinicius-passo",
          password: "VCYW1E6ukhF5dR3tK+tTOJGnmNSChfbPSOS9d0A+",
          database: "gebru-4212061-vinicius-passo",
          multipleStatements: true
        },
      });
      
    }
    return BaseDataBase.connection;
  }
  public static async destroyConnection(): Promise<void> {
    if (BaseDataBase.connection) {
      await BaseDataBase.connection.destroy();
      BaseDataBase.connection = null;
    }
  }
}

import {
    LikeQuotesDTO,
    OutInputLikeDTO,
    OutInputLikeQuotesDTO
  } from "../types/likes";
  import { BaseDataBase } from "./BaseDataBase";
  
  export class LikeQuotesDataBase extends BaseDataBase {
    private TABLE_NAME = "Likes";
    getQuotesById = async (id: string): Promise<void> => {
      await this.getConnection().from(this.TABLE_NAME).where({ id });
    };
  
    getQuotesLikeUser = async (userId: string): Promise<OutInputLikeDTO> => {
        
      const quotesOutInput = await this.getConnection()
        .from(this.TABLE_NAME)
        .join("UsersAccount", "Likes.userId", "=", "UsersAccount.id")
        .join("Quotes", "Likes.quotesId", "Quotes.id")
        .where("Likes.userId", "=", `${userId}`);
  
      return quotesOutInput[0];
    };
  
    getQuotesLikes = async (
      quotesId: string
    ): Promise<OutInputLikeQuotesDTO[]> => {
      const quotesOutInput = await this.getConnection()
        .from(this.TABLE_NAME)
        .join("UsersAccount", "Likes.userId", "=", "UsersAccount.id")
        .join("Quotes", "Likes.quotesId", "Quotes.id")
        .select("UsersAccount.name", "Quotes.phrase")
        .where({ quotesId });
  
      return quotesOutInput;
    };
    likesQuotesData = async (likes: LikeQuotesDTO): Promise<void> => {
      
        await this.getConnection().insert(likes).into(this.TABLE_NAME);
    };
    deslikeQuotesData = async (userId: string): Promise<void> => {
 
      await this.getConnection().from(this.TABLE_NAME).delete().where({ userId });
    };
  }
  
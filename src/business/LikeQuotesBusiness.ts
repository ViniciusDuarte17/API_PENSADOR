import { LikeQuotesDTO, OutInputLikeQuotes } from './../types/likes';
import { LikeQuotesDataBase } from '../data/LikeQuotesDataBase';
import { QuotesDataBase } from '../data/QuotesDataBase';
import { CustomError } from '../error/CustomError';
import { IdGeneration } from '../services/IdGeneretion';
import { Authenticator } from './../services/Authenticator';
export class LikeQuotesBusiness {
    constructor(
        private authenticator: Authenticator,
        private idGeneration: IdGeneration,
        private quotesDataBase: QuotesDataBase,
        private likeQuotesDataBase: LikeQuotesDataBase
      ) {}
      likeQuotesBusiness = async (
        idQhotes: string,
        token: string
      ): Promise<void> => {
        if (!idQhotes) {
          throw new CustomError(
            "É preciso informar o id da citação para curtir",
            422
          );
        }
        if (!token) {
          throw new CustomError("É preciso informar o token de acesso!", 422);
        }
        const tokenData = await this.authenticator.getTokenData(token);
     
        if (tokenData.expiredAt) {
          throw new CustomError("Usuário deslogado!", 401);
        }
    
        const quotesLike = await this.likeQuotesDataBase.getQuotesLikeUser(
          tokenData.id
        );
    
        if (quotesLike) {
          throw new CustomError("Você já curtiu esse post", 400);
        }
    
        const id = this.idGeneration.generationId();
    
        const likes: LikeQuotesDTO = {
          id,
          userId: tokenData.id,
          quotesId: idQhotes
        };
    
        await this.likeQuotesDataBase.likesQuotesData(likes);
      };
      deslikeQuotesBusiness = async (
        idQhotes: string,
        token: string
      ): Promise<void> => {
        if (!idQhotes) {
          throw new CustomError(
            "É preciso informar o id da citação para descurtir",
            422
          );
        }
    
        if (!token) {
          throw new CustomError("É preciso informar o token de acesso!", 422);
        }
        const tokenData = await this.authenticator.getTokenData(token);
        if (!tokenData) {
          throw new CustomError("Usuário deslogado!", 401);
        }
    
        const verifyExistQuotes = await this.quotesDataBase.getQuotesById(idQhotes);
        if (!verifyExistQuotes) {
          throw new CustomError("Esse post não existe", 404);
        }
    
        const quotesLike = await this.likeQuotesDataBase.getQuotesLikeUser(
          tokenData.id
        );
    
        if (!quotesLike) {
          throw new CustomError(
            "Esse post ainda não foi curtido, portanto não há como descurtir",
            404
          );
        }
    
        await this.likeQuotesDataBase.deslikeQuotesData(tokenData.id);
      };
    
      getLikesInTheQuotesBusiness = async (
        quotesId: string
      ): Promise<OutInputLikeQuotes> => {
        if (!quotesId) {
          throw new CustomError(
            "É necessário informar a citação para visualizar as curtidas!",
            422
          );
        }
    
        const likesInTheQuotes = await this.likeQuotesDataBase.getQuotesLikes(
          quotesId
        );
        const totalAmountInTheQuotes: number = likesInTheQuotes.length;
        const infoLikesQuotes: OutInputLikeQuotes = {
          likesInTheQuotes,
          totalAmountInTheQuotes
        };
        return infoLikesQuotes;
      };
}
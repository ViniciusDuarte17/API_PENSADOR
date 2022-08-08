import { LikeQuotesBusiness } from './../business/LikeQuotesBusiness';
import { Request, Response } from "express";
import { CustomError } from "../error/CustomError";

export class LikeQuotesController {
    constructor(private likeQuotesBusiness: LikeQuotesBusiness){}
    likeQuotesController = async (req: Request, res: Response): Promise<void> => {
        try {
          const idQuotes = req.params.idQuote as string;
          const token = req.headers.authorization;
          await this.likeQuotesBusiness.likeQuotesBusiness(idQuotes, token);
          res.status(201).send({ message: "Citação curtida!" });
        } catch (error) {
          if (error instanceof CustomError) {
            res.status(error.statusCode).send({ message: error.message });
          } else if (error) {
            res.status(400).send({ error });
          } else {
            res.status(500).send({ message: "error no servidor" });
          }
        }
      };
      deslikeQuotesController = async (
        req: Request,
        res: Response
      ): Promise<void> => {
        try {
          const idQuotes = req.params.idQuote as string;
          const token = req.headers.authorization;
          await this.likeQuotesBusiness.deslikeQuotesBusiness(idQuotes, token);
          res.status(201).send({ message: "Citação descurtida!" });
        } catch (error) {
          if (error instanceof CustomError) {
            res.status(error.statusCode).send({ message: error.message });
          } else if (error) {
            res.status(400).send({ error });
          } else {
            res.status(500).send({ message: "error no servidor" });
          }
        }
      };
    
      getLikesInTheQuotesController = async (
        req: Request,
        res: Response
      ): Promise<void> => {
        try {
          const quotesId = req.params.quotesId;
          const likesQuotes = await this.likeQuotesBusiness.getLikesInTheQuotesBusiness(
            quotesId
          );
          res.send({ likesQuotes });
        } catch (error) {
          if (error instanceof CustomError) {
            res.status(error.statusCode).send({ message: error.message });
          } else if (error) {
            res.status(400).send({ error });
          } else {
            res.status(500).send({ message: "error no servidor" });
          }
        }
      };
}
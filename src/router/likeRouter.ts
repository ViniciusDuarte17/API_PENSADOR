import { LikeQuotesController } from './../controller/LikeQuotesController';
import { QuotesDataBase } from './../data/QuotesDataBase';
import { LikeQuotesDataBase } from './../data/LikeQuotesDataBase';
import { LikeQuotesBusiness } from './../business/LikeQuotesBusiness';
import { Router } from 'express';
import { Authenticator } from '../services/Authenticator';
import { IdGeneration } from '../services/IdGeneretion';
export const likeRouter = Router()


const authenticator = new Authenticator()
const idGeneration = new IdGeneration()
const likeQuotesDataBase = new LikeQuotesDataBase()
const quotesDataBase = new QuotesDataBase()
const likeQuotesBusiness = new LikeQuotesBusiness(authenticator, idGeneration, quotesDataBase, likeQuotesDataBase)
const likeQuotesController = new LikeQuotesController(likeQuotesBusiness)

likeRouter.get("/like/:quotesId", (req, res) =>
likeQuotesController.getLikesInTheQuotesController(req, res)
);

likeRouter.post("/like/:idQuote", (req, res) =>
likeQuotesController.likeQuotesController(req, res)
);

likeRouter.delete("/deslike/:idQuote", (req, res) =>
likeQuotesController.deslikeQuotesController(req, res)
);

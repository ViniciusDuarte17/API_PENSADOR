import { DataQuotes } from './../services/DataQuotes';
import { IdGeneration } from './../services/IdGeneretion';
import { Authenticator } from './../services/Authenticator';
import { QuotesDataBase } from './../data/QuotesDataBase';
import { Router } from "express";
import { QuotesBusiness } from '../business/QuotesBusiness';
import { QuotesController } from '../controller/QuotesController';

export const quotesRouter = Router()

const authenticator = new Authenticator()
const idGeneration = new IdGeneration()
const dataQuotes = new DataQuotes()
const quotesDataBase = new QuotesDataBase()
const quotesBusiness = new QuotesBusiness(authenticator, idGeneration,dataQuotes, quotesDataBase)
const quotesController = new QuotesController(quotesBusiness, quotesDataBase)

quotesRouter.get("/", (req, res) => quotesController.readQuotesController(req,res))
quotesRouter.post("/", (req, res) => quotesController.createQuotesController(req, res))
quotesRouter.put("/update/:idQuote",(req, res) => quotesController.updateQuotesController(req, res))
quotesRouter.delete("/delete/:idQuote", (req, res) => quotesController.deleteQuotesController(req, res))
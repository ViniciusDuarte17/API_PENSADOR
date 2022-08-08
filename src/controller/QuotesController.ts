import { QuotesDataBase } from './../data/QuotesDataBase';
import { Request, Response } from "express";
import { QuotesBusiness } from "../business/QuotesBusiness";
import { CustomError } from "../error/CustomError";


export class QuotesController{
    constructor(private quotesBusiness: QuotesBusiness, 
        private quotesDataBase: QuotesDataBase
        ){}

    readQuotesController =async (req: Request, res: Response): Promise<void> => {
       try {
        const quotes = await this.quotesDataBase.readQuotesUsers()
    
        res.status(200).send({quotes })
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

    createQuotesController =async (req: Request, res: Response):Promise<void> => {
        try {
            const token = req.headers.authorization
            const phrase = req.body.phrase as string
            await this.quotesBusiness.createQuotesBusiness(token, phrase)
            res.status(201).send({message: "citação criada com secuesso!"})
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

    updateQuotesController =async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization
            const phrase = req.body.phrase as string  
            const idQuote = req.params.idQuote  
            await this.quotesBusiness.updateQuotesBusiness(token, phrase, idQuote)
            res.status(201).send({message: "citação editada com secuesso!"})

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

    deleteQuotesController =async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization
            const idQuote = req.params.idQuote
        
            await this.quotesBusiness.deleteQuotesBusiness(token, idQuote)
            res.status(200).send({message: "citação deletada com sucesso!"})

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
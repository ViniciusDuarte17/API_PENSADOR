import { IdGeneration } from './../services/IdGeneretion';
import { CustomError } from "../error/CustomError"
import { Authenticator } from "../services/Authenticator"
import { QuotesDataBase } from '../data/QuotesDataBase';
import { DataQuotes } from '../services/DataQuotes';
import { Quotes, readQuotes, updateQuotes } from '../types/quotes';

export class QuotesBusiness {
    constructor(
        private authenticator: Authenticator,
        private idGeneration: IdGeneration,
        private dateQuotes: DataQuotes,
        private quotesDataBase: QuotesDataBase
    ) { }

    createQuotesBusiness = async (token: string, phrase: string): Promise<void> => {
        if (!token) {
            throw new CustomError("É necessário informar um token de acesso!!", 422)
        }
        if (!phrase) {
            throw new CustomError("É necessário preencher o campo da citação!!", 422)
        }
        const tokenData = await this.authenticator.getTokenData(token)
        if (!tokenData) {
            throw new CustomError("Usuário Deslogado", 401);
        }

        if (tokenData.expiredAt) {
            throw new CustomError("Usuário deslogado!", 401);
        }

        const id = this.idGeneration.generationId()
        const date = this.dateQuotes.currentTime()

        const quotes: Quotes = {
            id, phrase, date, userId: tokenData.id
        }
        await this.quotesDataBase.createQuotesData(quotes)
    }

    updateQuotesBusiness = async (token: string, phrase: string, idQuote: string): Promise<void> => {

        if (!token) {
            throw new CustomError("É necessário informar um token de acesso!!", 422)
        }
        if (!phrase) {
            throw new CustomError("É necessário preencher o campo da citação!!", 400)
        }
        const tokenData = this.authenticator.getTokenData(token)
        if (!tokenData) {
            throw new CustomError("Usuário Deslogado", 401);
        }

        if (tokenData.expiredAt) {
            throw new CustomError("Usuário deslogado!", 401);
        }

        if (!idQuote) {
            throw new CustomError("É necessário informar id da citação!!", 422)
        }

        const quotes = await this.quotesDataBase.getQuotesById(idQuote)

        if (!quotes) {
            throw new CustomError("Citação não identificada, verifique se id está correto!", 404);
        }

        const updateQuotes: updateQuotes = { id: tokenData.id, phrase }

        await this.quotesDataBase.updateQuotesData(updateQuotes)
    }

    deleteQuotesBusiness = async (token: string, idQuote: string): Promise<void> => {

        if (!token) {
            throw new CustomError("É necessário informar um token de acesso!!", 422)
        }
        if (!idQuote) {
            throw new CustomError("É necessário informar id da citação!!", 422)
        }
        const tokenData = this.authenticator.getTokenData(token)
        if (!tokenData) {
            throw new CustomError("Usuário Deslogado", 401);
        }

        if (tokenData.expiredAt) {
            throw new CustomError("Usuário deslogado!", 401);
        }

        const quotes = await this.quotesDataBase.getQuotesById(idQuote)
        if (!quotes) {
            throw new CustomError("Citação não encontrada", 404);
        }

        const id = tokenData.id as string

        await this.quotesDataBase.deleteQuotesData(id, idQuote)
    }
}
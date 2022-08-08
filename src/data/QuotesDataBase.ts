import { readQuotes, updateQuotes } from './../types/quotes';
import { Quotes } from "../types/quotes";
import { BaseDataBase } from "./BaseDataBase";

export class QuotesDataBase extends BaseDataBase{
    private TABLE_NAME = "Quotes"
    createQuotesData =async (quotes: Quotes):Promise<void> => {
        await this.getConnection().insert(quotes).into(this.TABLE_NAME)
    }
    getQuotesById =async (id: string):Promise<Quotes> => {
        const quotes = await this.getConnection().from(this.TABLE_NAME).where({id})
        return quotes[0]
    }

    readQuotesUsers = async (): Promise<readQuotes[]> => {
        const quotesUsers  = await this.getConnection()
        .select("Quotes.id AS id ", "name", " phrase", "date")
        .from(this.TABLE_NAME)
        .join("UsersAccount", function(){
            this
            .on("UsersAccount.id", "=", "Quotes.userId")
        })
        
        .orderBy("date", "desc")
        return quotesUsers
    }

    updateQuotesData =async (updateQuotes : updateQuotes): Promise<void> => {
        const id = updateQuotes.id
        await this.getConnection()
        .update({
            phrase: updateQuotes.phrase
        })
        .from(this.TABLE_NAME)
        .where({userId: id})
    }

    deleteQuotesData =async (id: string, idQuote: string): Promise<void> => {
        await this.getConnection()
        .from(this.TABLE_NAME)
        .delete()
        .where({userId: id})
        .where({id: idQuote})
    }
}
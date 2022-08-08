export type LikeQuotesDTO = {
    id: string;
    quotesId: string;
    userId: string;
  };
  
  export type OutInputLikeQuotesDTO = {
    name: string;
  };
  export type OutInputLikeQuotes = {
    likesInTheQuotes: OutInputLikeQuotesDTO[];
    totalAmountInTheQuotes: number;
  };
  export type OutInputLikeDTO = {
    id: string;
    userId: string;
    quotesId: string;
    name: string;
    email: string;
    password: string;
    phrase: string;
    date: Date;
  };
  
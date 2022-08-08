import { v4 } from "uuid"
export class IdGeneration {
    generationId = (): string =>{
        return v4()
    }
}
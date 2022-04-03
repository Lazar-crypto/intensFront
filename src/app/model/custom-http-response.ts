import { Candidate } from "./candidate"

export interface CustomHttpResponse{
 
    timeStamp: Date
    statusCode: number
    status: string
    reason: string
    msg: string
    data: Map<string,any>

}
import { Skill } from "./skill"


export class Candidate{
    id: number
    name: string
    dateOfBirth: Date
    contactNumber: string
    email: string
    skills: Array<Skill>

 constructor(){
    this.id = 0
    this.name = "name"
    this.dateOfBirth = new Date()
    this.contactNumber = "number"
    this.email = "email"
    this.skills = new Array()
} 
}


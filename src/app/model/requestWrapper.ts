import { Skill } from "./skill";
import{Candidate} from "./candidate";

export interface RequestWrapper{
    candidate: Candidate,
    skill: Skill
}
import { OccupationInterface } from "./IOcc";
import { GenderInterface } from "./IGender";

export interface MemberInterface {
    ID? : number;
    UserName? : string;
    PassWord? : string;
    FirstName? : string;
    LastName? : string;
    Email? : string;
    Birthday? : string;
    Phone? : string;
    Profile?: string;

    GenderID?: number;
    Gender?: GenderInterface;
    OccupationID? : number;
    Occupation? : OccupationInterface;
}
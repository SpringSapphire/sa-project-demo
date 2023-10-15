import { OccupationInterface } from "./IOcc";
import { GenderInterface } from "./IGender";

export interface MemberInterface {
    ID? : number;
    Username? : string;
    Password? : string;
    FirstName? : string;
    LastName? : string;
    Email? : string;
    Birthday? : string;
    Phone_number? : string;

    GenderID?: number;
    Gender?: GenderInterface;
    OccupationID? : number;
    Occupation? : OccupationInterface;
}
import { OccupationInterface } from "./IOcc";
import { GenderInterface } from "./IGender";
import { AdminInterface } from "./IAdmin";

export interface MemberInterface {
    ID? : number;
    Username? : string;
    Password? : string;
    FirstName? : string;
    LastName? : string;
    Email? : string;
    Birthday? : string;
    Phone_number? : string;

    AdminID? : number;
    Admin: AdminInterface;
    GenderID?: number;
    Gender?: GenderInterface;
    OccupationID? : number;
    Occupation? : OccupationInterface;
}
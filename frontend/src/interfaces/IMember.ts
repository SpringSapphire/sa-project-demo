import { OccupationInterface } from "./IOccupation";
import { GenderInterface } from "./IGender";
import { AdminInterface } from "./IAdmin";

export interface MemberInterface {
    ID? : Number;
    Username? : string;
    Password? : string;
    FirstName? : string;
    LastName? : string;
    Email? : string;
    Birthday? : string;
    Phone_number? : string;

    AdminID? : Number;
    Admin: AdminInterface;
    GenderID?: Number;
    Gender?: GenderInterface;
    OccupationID? : Number;
    Occupation? : OccupationInterface;
}
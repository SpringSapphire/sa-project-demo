import { GenderInterface } from "./IGender";

export interface DentistInterface {
    ID? : number;
    UserName? : string;
    PassWord? : string;
    FirstName? : string;
    LastName? : string;
    Email? : string;
    Birthday? : string;
    Phone? : string;
    GenderID?: number;
    Gender?: GenderInterface;
}
import { AdminInterface } from "./IAdmin";
import { GenderInterface } from "./IGender";

export interface DentistInterface {
    ID?: Number;
    Username?: string;
    Password?: string;
    FirstName?: string;
    LastName?: string;
    Email?: string;
    Birthday?: string;
    Phone_number?: string;

    AdminID? : Number;
    Admin: AdminInterface;
    GenderID?: Number;
    Gender?: GenderInterface;
}

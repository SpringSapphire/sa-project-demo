import { GenderInterface } from "./IGender";

export interface DentistInterface {
    ID?: number;
    Username?: string;
    Password?: string;
    FirstName?: string;
    LastName?: string;
    Email?: string;
    Birthday?: string;
    Phone_number?: string;

    GenderID?: number;
    Gender?: GenderInterface;
}

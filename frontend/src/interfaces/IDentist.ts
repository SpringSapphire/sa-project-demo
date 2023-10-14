import { GenderInterface } from "./IGender";

export interface DentistInterface {
    ID?: number;
    Username?: string;
    Password?: string;
    Firstname?: string;
    Lastname?: string;
    Email?: string;
    Bod?: string;
    Phone_number?: string;

    GenderID?: number;
    Gender?: GenderInterface;
}

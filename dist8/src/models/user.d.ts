import { Entity } from "@loopback/repository";
export declare class User extends Entity {
    id: number;
    firstname: string;
    dob: string;
    email: string;
    lastname: string;
    password: string;
    getId(): number;
}

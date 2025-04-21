import { Subject } from "./subject";

export interface Student{
    id: number,
    name: string,
    dateOfBirth: string,
    gender: string,
    email: string,
    phone:string,
    subjects: Subject[]
}
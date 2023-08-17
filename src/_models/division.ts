import { User } from "./user";
import { Image } from "./image";
import { Department } from "./department";

export interface Division {
    assistant?: number | User;
    department?: number| Department;
    deputy?: number | User;
    description?: string;
    id?: string;
    img_banner?: number | Image;
    img_card?: number | Image;
    manager?: number | User;
    name?: string;
    slug?: string;
    staff?: number[] | User[];
}
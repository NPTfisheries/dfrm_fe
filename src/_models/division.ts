import { User, Image } from "./interfaces";
import { Department } from "./department";

export interface Division {
    assistant?: number | User;
    department?: number| Department;
    deputy?: number | User;
    description?: string;
    id?: string;
    img_banner?: number | Image;
    img_card?: number | Image;
    is_active?: boolean;
    manager?: number | User;
    name?: string;
    slug?: string;
    staff?: number[] | User[];
}
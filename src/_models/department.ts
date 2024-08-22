import { User } from "./user";
import { Image } from "./image";

export interface Department {
    assistant?: number | User;
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
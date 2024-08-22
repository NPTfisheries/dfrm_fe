import { Department } from "./department";
import { Image } from "./image";
import { User } from "./user";

export interface Project {
    department?: number | Department;
    description?: string;
    id?: number;
    img_banner?: number | Image;
    img_card?: number | Image;
    is_active?: boolean;
    name?: string;
    project_leader?: number[] | User[];
    slug?: string;
}
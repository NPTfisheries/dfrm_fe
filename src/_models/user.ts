import { Profile } from "./profile";

export interface User {
    id?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    full_name?: string;
    profile: Profile;
}
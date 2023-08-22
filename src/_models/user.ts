import { Profile } from "./profile";

export interface User {
    email?: string;
    first_name?: string;
    id?: string;
    last_name?: string;
    profile: Profile;
}
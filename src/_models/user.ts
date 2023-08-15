export interface User {
    id?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    profile: {
        title?: string;
        work_phone?: string;
        mobile_phone?: string;
        city?: string;
        state?: string;
        bio?: string;
        photo?: string;
    }
}
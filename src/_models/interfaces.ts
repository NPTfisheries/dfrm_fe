
export interface Profile {
    title?: string;
    work_phone?: string;
    mobile_phone?: string;
    city?: string;
    state?: string;
    bio?: string;
    photo?: string;
}

export interface User {
    id?: number;
    email?: string;
    first_name?: string;
    last_name?: string;
    full_name?: string;
    profile?: Profile;
}

export interface Image {
    id?: number;
    slug?: string;
    name?: string;
    description?: string;
    photographer?: string;
    photo_date?: string;
    source?: string;
    image?: string;
}

export interface Department {
    assistant?: number | User;
    deputy?: number | User;
    description?: string;
    display?: boolean;
    id?: string;
    img_banner?: number | Image;
    img_card?: number | Image;    
    is_active?: boolean;
    manager?: number | User;
    name?: string;
    slug?: string;
    staff?: number[] | User[];
}

export interface Division {
    assistant?: number | User;
    department?: number| Department;
    deputy?: number | User;
    description?: string;
    display?: boolean;
    id: number;
    img_banner?: number | Image;
    img_card?: number | Image;
    is_active?: boolean;
    manager?: number | User;
    name?: string;
    slug?: string;
    staff?: number[] | User[];
}

export interface Project {
    department?: number | Department;
    description?: string;
    display?: boolean;
    id?: number;
    img_banner?: number | Image;
    img_card?: number | Image;
    is_active?: boolean;
    name?: string;
    project_leader?: number[] | User[];
    slug?: string;
}

export interface Activity {
    id?: number;
    activity_id?: number;
    updated_at?: Date;
    updated_by?: User | number;
    user?: number | User;
    task?: Task | number;
    location?: Location | number;
    instrument?: Instrument | number;
    header?: any[];
    detail?: any[];
  }

export interface FacilityType {
    id?: number;
    object_type?: string;
    name?: string;
}

export interface Geometry {
    type?: string;
    coordinates?: number[];
}

export interface Facility {
    id?: number;
    type?: string;
    location?: Location;
    slug?: string;
    facility_type?: FacilityType;
    name?: string;
    description?: string;
    manager?: User;
    deputy?: User;
    assistant?: User;
    staff?: User[];
    img_banner?: Image;
    img_card?: Image;
    phone_number?: string;
    street_address?: string;
    mailing_address?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    is_active?: boolean;
    display?: boolean;
}

export interface Task {
    task_type?: number;
    project?: number | string | Project;
    division?: number | string | Division;
    display?: boolean;
    id?: number;
    description?: string;
    supervisor: number | User;
    name?: string;
    slug?: string;
    is_active?: boolean;
    sort_order?: number;
    img_card: number | Image;
    img_banner: number | Image;
}

export interface LookUp {
    id: number;
    object_type: string;
    name: string;
}

export interface Document {
    id?: number;
    title?: string;
    description?: string;
    primary_author?: string;
    employee_authors?: string;
    publish_date?: string;
    document_type?: string;
    citation?: string; 
    keywords?: string;
}

export interface Location {
    id?: number;
    name?: string;
    description?: string;
    geometry?: Geometry;
}

export interface Instrument {
    id?: number;
    description?: string;
    name?: string;
    instrument_type?: number;
    model?: string;
    serial_number?: string;
    manufacturer?: string;
}

export interface InvasiveSpecies {
    common_name?: string;
    species_name?: string;
    species_image: string;
    image_attribution?: string;
    description?: string;
    size?: string;
    color?: string;
    shape?: string;
    habitat?: string;
    native_to?: string;
    invasive_type: number | LookUp;
    sort_order?: number;
}
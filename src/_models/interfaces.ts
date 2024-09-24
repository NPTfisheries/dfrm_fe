import { Project } from "./project";

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

export interface Dataset {
    id?: number;
    name?: string;
    description?: string;
    summary_dataset?: boolean;
}

export interface Activity {
    id?: number;
    user?: number | User;
    project?: Project | number;
    dataset?: Dataset | number;
    date?: Date;
    data?: {};
  }

export interface FacilityType {
    id?: number;
    object_type?: string;
    name?: string;
}

export interface FacilityProperties {
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
}



export interface Geometry {
    type?: string;
    coordinates?: number[];
}

export interface Facility {
    id?: number;
    type?: string;
    geometry?: Geometry;
    properties?: FacilityProperties;
}

export interface Lookup {
    id?: number;
    object_type?: string;
    name?: string;
}

// cdms filtering
export interface filterOptions {
    options?: Object[];
    placeholder?: string;
    argName: string;
    required?: boolean;
  }
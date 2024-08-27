export interface Subproject {
    name?: string;
    description?: string;
    id?: number;
    division?: number;
    project?: number | string;
    lead?: string;
    sort_order?: number;
    is_active?: boolean;
}
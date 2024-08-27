export interface Task {
    task_type?: number;
    subproject?: number | string;
    id?: number;
    description?: string;
    supervisor?: number;
    name?: string;
    slug?: string;
    is_active?: boolean;
    sort_order?: number;
}
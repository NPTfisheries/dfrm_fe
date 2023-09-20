export function adminAccess(permissionGroup: string) {

    const permittedGroups = ['Admin'];

    return permittedGroups.includes(permissionGroup);
}
export function managerAccess(permissionGroup: string) {

    const permittedGroups = ['Admin', 'Manager'];

    return permittedGroups.includes(permissionGroup);
}

export function projectleaderAccess(permissionGroup: string) {

    const permittedGroups = ['Admin', 'Manager', 'Project_leader'];

    return permittedGroups.includes(permissionGroup);
}

export function professionalAccess(permissionGroup: string) {

    const permittedGroups = ['Admin', 'Manager', 'Project_leader', 'Professional'];

    return permittedGroups.includes(permissionGroup);
}

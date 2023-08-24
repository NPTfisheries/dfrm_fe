export function managerAccess(permissionGroup:string) {
    
    const permittedGroups = ['Admin', 'Manager'];
    
    return permittedGroups.includes(permissionGroup);
}

export function professionalAccess(permissionGroup:string) {
    
    const permittedGroups = ['Admin', 'Manager', 'Professional'];
    
    return permittedGroups.includes(permissionGroup);
}
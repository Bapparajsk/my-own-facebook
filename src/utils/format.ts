export const formatName = (name: string, size: number, p?: string, pSize?: 3 | 4 | 5): string => {
    let formatP = p || '.';
    let formatPSize = pSize || 3;

    if(name.length <= size) return name;

    return name.substring(0, size) + formatP.repeat(formatPSize);
}

export const getRoleKey = (role: string): string => {
    if (role === "Others") {
        return "others";
    }

    return role.split(' ').map(word => word.charAt(0).toLowerCase()).join('');
}

export const formatEmail = (email: string, p: string = "*"): string => {

    const [name, domain] =  email.split('@');

    let fastChar = name.charAt(0);
    let lastChar = name.charAt(name.length - 1);

    return fastChar + p.repeat(name.length - 2) + lastChar + '@' + domain;
};
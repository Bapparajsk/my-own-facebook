export const formatName = (name: string, size: number, p?: string, pSize?: 3 | 4 | 5): string => {
    let formatP = p || '.';
    let formatPSize = pSize || 3;

    if(name.length <= size) return name;

    return name.substring(0, size) + formatP.repeat(formatPSize);
}

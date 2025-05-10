export function slash(path: string): string {
    return path.replace(/\\/g, '/');
}

export function toArray<T>(value: T | T[]): T[]{
    return Array.isArray(value) ? value : [value];
}
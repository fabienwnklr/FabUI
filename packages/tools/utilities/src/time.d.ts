export declare function debounce<T extends (...args: any[]) => any>(callback: T, delay: number): (...args: Parameters<T>) => void;

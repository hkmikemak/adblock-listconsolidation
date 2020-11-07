interface Array<T> {
  unique<T>(this: T[]): T[];
}

function unique<T>(this: T[]) {
    return [...new Set(this)];
}

Array.prototype.unique = unique;

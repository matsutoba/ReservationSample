class Storage {
    storage = sessionStorage;
    constructor() {
        this.storage.clear();
    }

    set(key: string, value: string): void {
        this.storage.setItem(key, value);
    }

    get(key: string): string|null {
        return this.storage.get(key);
    }

    setJSON<T>(key: string, value: T): void {
        this.storage.setItem(key, JSON.stringify(value));
    }

    getJSON<T>(key: string): T|null {
        const obj = this.storage.getItem(key);
        if (obj) {
            return JSON.parse(obj);
        }
        return null;
    }
}

export default new Storage();
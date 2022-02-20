type StorageState<T> = Partial<Record<keyof T, T[keyof T]>>

export abstract class AbstractStorage<T extends Object> {

    state: StorageState<T> = this.getLocal();

    constructor(
        public storage: Storage = localStorage,
        public key: string,
    ) {}

    set(key: keyof T, data: T[keyof T]): void {
        this.state[key] = data;
        this.update();
    }

    get(key: keyof T): T[keyof T] | undefined {
        return this.state[key];
    }

    clear() {
        this.state = {};
        this.update();
    }

    remove(key: keyof T) {
        delete this.state[key];
        this.update();
    }

    protected update() {
        try {
            this.storage.setItem(this.key, JSON.stringify(this.state));
        } catch (e) {
            console.error(e);
        }
    }

    protected getLocal(): StorageState<T> {
        try {
            const storage = this.storage.getItem(this.key);
            return JSON.parse(storage || '{}');
        } catch {
            return {};
        }
    }
}
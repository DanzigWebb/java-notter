export abstract class SelectionModel<T> {
    private selection = new Set<T>();

    value() {
        return this.selection;
    }

    asArray() {
        return Array.from(this.selection)
    }

    has(value: T): boolean {
        return this.selection.has(value);
    }

    get size() {
        return this.selection.size;
    }

    add(value: T | T[]) {
        if (Array.isArray(value)) {
            value.forEach(this.selection.add, this.selection);
        } else {
            this.selection.add(value);
        }

        return this;
    }

    set(value: T | T[]) {
        this.selection.clear();
        return this.add(value);
    }

    remove(value: T) {
        this.selection.delete(value);
        return this;
    }

    clear() {
        this.selection.clear();
        return this;
    }
}
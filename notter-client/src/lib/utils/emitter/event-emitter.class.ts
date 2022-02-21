type Events = Record<string, Array<(v: any) => void>>

export class EventEmitter {
    private events: Events = {};

    subscribe(eventName: string, callback: (arg?: any) => void) {
        !this.events[eventName] && (this.events[eventName] = []);
        this.events[eventName].push(callback);
    }

    unsubscribe(eventName: string, callback: (arg?: any) => void) {
        this.events[eventName] = this.events[eventName].filter(
            (eventCallback) => callback !== eventCallback
        );
    }

    emit(eventName: string, args?: any) {
        const event = this.events[eventName];
        if (event) {
            event.forEach(callback => callback.call(null, args));
        }
    }
}
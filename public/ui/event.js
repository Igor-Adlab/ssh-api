class Emitter {
    constructor() {
        this.events = {};
    }

    on(event, fn) {
        this.events[event] = [...this.events[event] || [], fn];
    }

    emit(event, ...options) {
        (this.events[event] || []).map(fn => fn(...options));
    }
}

export default new Emitter();

export const EVENT_SFTP = "EVENT_SFTP";
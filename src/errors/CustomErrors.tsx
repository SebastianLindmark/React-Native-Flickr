export class TimeoutError extends Error {
    constructor(message?: string) {
        super(message);
    }
}

export class InvalidApiKeyError extends Error {
    constructor(message?: string) {
        super(message);
    }
}
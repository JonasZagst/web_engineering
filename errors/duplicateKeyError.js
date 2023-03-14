class DuplicateKeyError extends Error {
    constructor(message) {
        if (message != null) {
            super(message);
        } else {
            super("Duplicate Key, please enter a unique key.");
        }
        this.name = "DuplicateKeyError";
        this.code = 4;
    }
}

export default DuplicateKeyError;
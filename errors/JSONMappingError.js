class JSONMappingError extends Error {
    constructor(message) {
        if (message != null) {
            super(message);
        } else {
            super("Could not map the provided json data to the database model.");
        }
        this.name = "JSONMappingError";
        this.code = 5;
    }
}

export default JSONMappingError;
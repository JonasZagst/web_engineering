class DbPutError extends Error {
    constructor(message) {
        if (message != null) {
            super(message);
        } else {
            super("An Error occurred while changing a document on the database");
        }
        this.name = "DbPutError";
        this.code = 3;
    }
}

export default DbPutError;
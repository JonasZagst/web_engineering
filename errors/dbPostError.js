class DbPostError extends Error {
    constructor(message) {
        if (message != null) {
            super(message);
        } else {
            super("An Error occurred while writing to the database");
        }
        this.name = "DbPostError";
        this.code = 2;
    }
}

export default DbPostError;
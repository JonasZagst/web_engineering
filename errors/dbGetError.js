class DbGetError extends Error {
    constructor(message) {
        if (message != null) {
            super(message);
        } else {
            super("An Error occurred while querying for your requested data");
        }
        this.name = "DbGetError";
        this.code = 1;
    }
}

export default DbGetError;
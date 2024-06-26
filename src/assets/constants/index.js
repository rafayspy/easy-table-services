const CONSTANTS = {
    baseUrl: 'http://localhost:3000',
    cookieName: 'easy-table-auth',
    tokenSecret: 'tokenSecret123456789',
    CURRENCY: '€',
    // MONGO_CONNECTION_STRING: 'mongodb://127.0.0.1:27017/ets',
    // DB_NAME: 'ets',
    DB_NAME: "easyTableService",
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
}

export default CONSTANTS
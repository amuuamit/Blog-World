let IS_PROD = true;
const server = IS_PROD ?
    "http://localhost:5001":
    "http://localhost:8000";


export default server;
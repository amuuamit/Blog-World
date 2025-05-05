let IS_PROD = true;
// const server = IS_PROD
//   ? "http://localhost:5001"
//   : "https://blog-world-3son.onrender.com";

const server = IS_PROD
  ? "https://blog-world-3son.onrender.com"
  : "http://localhost:5001";
export default server;

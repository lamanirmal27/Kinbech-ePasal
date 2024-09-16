const allowedOrigins = require("./allowedOrigins");

if (!Array.isArray(allowedOrigins)) {
  throw new Error("allowedOrigins must be an array");
}

const corsOptions = {
  origin: (origin, callback) => {
    if (typeof origin !== "string") {
      callback(null, true); // or handle this case differently
    } else if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,

};
module.exports = corsOptions;

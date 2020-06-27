const path = require("path");

module.exports = {
  entry: "./src/wdc.js",
  output: {
    filename: "wdc.js",
    path: path.resolve(__dirname, "dist")
  },
  mode: "production"
};

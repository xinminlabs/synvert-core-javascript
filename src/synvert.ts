import Rewriter from "./rewriter";
import Configuration from "./configuration";

const ALL_JS_FILES = "**/*.{js,jsx}";
const ALL_TS_FILES = "**/*.{ts,tsx}";

const pjson = require("../package.json");
const version = pjson.version;

export { Rewriter, Configuration, ALL_JS_FILES, ALL_TS_FILES, version };

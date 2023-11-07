/**
 * @jest-environment node
 */

const path = require("path");
const sassTrue = require("sass-true");

const sassFile = path.join(__dirname, "../src/scss/index.test.scss");

sassTrue.runSass({ describe, it }, sassFile);

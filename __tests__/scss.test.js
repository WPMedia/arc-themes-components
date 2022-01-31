/**
 * @jest-environment node
 */

var path = require('path');
var sassTrue = require('sass-true');

var sassFile = path.join(__dirname, '../src/scss/index.test.scss');

sassTrue.runSass({ file: sassFile }, { describe, it });

#!/usr/bin/env node

var fs = require('fs');
var cli = process.argv.slice(2);

require.extensions['.vtt'] = function (module, filename) {
    console.log('ok weird');
    console.log(filename);
    module.exports = fs.readFileSync(filename, 'utf8');
};

var lineNr = 0;
var input = require("./test.vtt");

input = input
  .replace(/([\d]{2}:[\d]{2}:[\d]{2}.[\d]{3} -->)/g, "ROBINISCOOL\r\n$1")
  .replace(/([\d]{2}:[\d]{2}:[\d]{2}.[\d]{3})\r\n\r\n/g, "$1\r\n")
  .replace(/WEBVTT.*$\r\n\r\n/gm, '')
  .replace(/ROBINISCOOL\r\n00:00:00.000 --> 00:00:00.000[\s\S]*?ROBINISCOOL/gm, "ROBINISCOOL")
  .replace(/([\d]{2}:[\d]{2}:[\d]{2})\.([\d]{3})/g, "$1,$2")
  .replace(/ROBINISCOOL/g, function(s){
    return ++lineNr;
  });
  
fs.writeFile(args[0].replace('.vtt', '.srt'), input, (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});

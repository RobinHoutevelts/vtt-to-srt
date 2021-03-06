#!/usr/bin/env node

var fs = require('fs');
var cli = process.argv.slice(2);

var lineNr = 0;
var input = fs.readFileSync("./"+cli[0], 'utf8');

input = input
  .replace(/([\d]{2}:[\d]{2}:[\d]{2}.[\d]{3} -->)/g, "ROBINISCOOL\r\n$1")
  .replace(/([\d]{2}:[\d]{2}:[\d]{2}.[\d]{3})\r\n\r\n/g, "$1\r\n")
  .replace(/WEBVTT[\s\S]*?[\d]{2}:[\d]{2}:[\d]{2}.[\d]{3}/gm, "$1")
  .replace(/ROBINISCOOL\r\n00:00:00.000 --> 00:00:00.000[\s\S]*?ROBINISCOOL/gm, "ROBINISCOOL")
  .replace(/([\d]{2}:[\d]{2}:[\d]{2})\.([\d]{3})/g, "$1,$2")
  .replace(/ROBINISCOOL/g, function(s){
    return ++lineNr;
  });
  
fs.writeFile(cli[0].replace('.vtt', '.srt'), input, (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});

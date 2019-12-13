#!/usr/bin/env node
var dataBase = require("./note.json");
const fs = require("fs");
const argv = require("yargs")
  .usage(
    "usage: file.js <command> (--title OR -t) [string] (--body OR -b) [string] "
  )
  .command("add", "add a note")
  .command("remove", "remove a note")
  .command("list", "list all notes")
  .options({
    t: {
      type: "string",
      description: "specify the note's title",
      alias: "title"
    },
    b: {
      type: "string",
      description: "specify the note's body",
      alias: "body"
    }
    // r: { type: "string", alias: "remove" }
  }).argv;

if (argv._ == "add" && argv.title && argv.body) {
  fs.writeFileSync(
    "./note.json",
    JSON.stringify([...dataBase, { title: argv.title, body: argv.body }]),
    "utf8",
    error => {
      if (error) {
        return error;
      }
    }
  );
  console.log([...dataBase, { title: argv.title, body: argv.body }]);
}

if (argv._ == "remove" && argv.title) {
  fs.writeFile(
    "./note.json",
    JSON.stringify(dataBase.filter(el => el.title !== argv.title)),
    "utf8",
    error => {
      if (error) {
        return error;
      }
    }
  );
  console.log(dataBase.filter(el => el.title !== argv.title));
}

if (argv._ == "list") {
  console.log(dataBase);
}

if (argv._ == "read" && argv.title) {
  console.log(dataBase.filter(el => el.title == argv.title));
}

if ((argv._ == "remove" && !argv.title) || (argv._ == "add" && !argv.title) || (argv._ == "read" && !argv.title) ) {
  console.log("get help with --help ");
}

// console.log(argv);

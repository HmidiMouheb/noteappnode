const fs = require("fs");
const loadsh = require("lodash");
const chalk = require("chalk");
const notes = require("./notes.json");

let command = process.argv[2];
let titleKey = process.argv[3];
let title = process.argv[4];
let bodyKey = process.argv[5];
let body = process.argv[6];

const noteAdder = (command, titleKey, title, bodyKey, body) => {
  let listingNotes = r => {
    for (let i = 0; i < r.length; i++)
      console.log(`title:${r[i].title} \n body:${r[i].body}\n`);
  };
  if (
    command == "add" &&
    titleKey == "--title" &&
    title != null &&
    bodyKey == "--body" &&
    body != null
  ) {
    fs.writeFileSync(
      "./notes.json",
      JSON.stringify([...notes, { title: title, body: body }]),
      "utf8",
      error => {
        if (error) {
          console.log(error);
        }
      }
    );
    console.log([...notes, { title: title, body: body }]);
  }

  if (command === "list") {
    console.log(
      `you have ${chalk.blue(notes.length)} notes \n ${listingNotes(notes)}`
    );
  }

  if (
    (command == ("add" || "list" || "read") &&
      titleKey !== "--title" &&
      !title &&
      bodyKey !== "--body" &&
      !body) ||
    command == "--help"
  ) {
    console.log(
      chalk.italic(
        "--help : show help\n--title : title of the note\n--body : body of the note"
      )
    );
  }

  if (command == "remove" && titleKey == "--title" && title) {
    fs.writeFileSync(
      "./notes.json",
      JSON.stringify(notes.filter(el => el.title !== title)),
      "utf8",
      error => {
        if (error) {
          console.log(error);
        }
      }
    );
    console.log(notes.filter(el => el.title !== title));
  }

  if (command == "read" && titleKey == "--title" && title) {
    specified = notes.filter(el => el.title == title);
    console.log(specified);
  }
};

noteAdder(command, titleKey, title, bodyKey, body);

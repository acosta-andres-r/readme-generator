const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateMarkdown = require("./utils/generateMarkdown.js")

const writeFileAsync = util.promisify(fs.writeFile);

// array of questions for user
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is title of project?"
  },
  {
    type: "input",
    name: "description",
    message: "What is the description of the project?"
  },
  {
    type: "confirm",
    name: "table", // true or false
    message: "Does the README require a table of content?"
  },
  {
    type: "input",
    name: "installation",
    message: "What are the installation instructions?"
  },
  {
    type: "input",
    name: "usage",
    message: "What is the usage information?"
  },
  {
    type: "list",
    name: "license",
    message: "Choose a license for your application",
    choices: [
      'MIT',
      'GPLv3',
      'AGPL',
      'ISC',
      'IPL 1.0'
    ]
  },
  {
    type: "input",
    name: "user",
    message: "Enter your name"
  },
  {
    type: "input",
    name: "github",
    message: "Enter your GitHub Username"
  },
  {
    type: "input",
    name: "contributing",
    message: "What are the contribution guidelines?"
  },
  {
    type: "input",
    name: "test",
    message: "What are the test instructions?"
  }
];

// function to initialize program
function init() {
  return inquirer.prompt(questions);
}

// function call to initialize program
init()
  .then(function (answers) {
    const markdown = generateMarkdown(answers)

    // Write markdown file
    return writeFileAsync("./markdown/README.md", markdown)
  }).then(function () {
    console.log("Successfully wrote to README.md");
  })
  .catch(function (err) {
    console.log(err);
  });;


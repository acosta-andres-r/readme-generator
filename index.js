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

// Creation of loop with asyn/await for contributors
// If more contributors 
const anyContributor = [
  {
    type: "confirm",
    name: "isAnyContrib",
    message: "Is there any contributor?"
  }
]
// Prompt contributor's info
const contribPrompt = [{
  type: "input",
  name: "name",
  message: "What is the contributor's name?"
},
{
  type: "input",
  name: "github",
  message: "What is the contributor's Github username?"
},
{
  type: "confirm",
  name: "again",
  message: "Do you want to input another contributor?"
}];

//  FUNCTIONS

// Prompt contributor questions to form a loop with async/await
const getContributors = async (input = []) => {
  const { again, ...answers } = await inquirer.prompt(contribPrompt);
  
  const newContributors = [...input, answers];

  return again ? getContributors(newContributors) : newContributors;
};

// Function to initialize program
async function init() {
  try {
    responses = await inquirer.prompt(questions);

    const { isAnyContrib } = await inquirer.prompt(anyContributor);

    if (isAnyContrib) {
      contributors = await getContributors(); // Return: Array with contributors object
      responses ['contributors'] = contributors;
    }

    console.log(responses); 
    return responses;
  }
  catch (err) {
    console.error(err);
  }
};

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
  });
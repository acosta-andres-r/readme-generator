// function to generate markdown for README
function generateMarkdown(data) {

  // String of Table of content
  const tableOfContent = `### Table of Contents

  * [Installation](#installation)
  * [Usage](#usage)
  * [Credits](#credits)
  * [License](#license)
  * [Contributing](#contributing)
  * [Test](#test)
  * [Questions](#questions)`

  // LICENSE:
  const licenses = {
    MIT: '![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)',
    GPLv3: '![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)',
    AGPL: '![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)',
    ISC: '![ISC License](https://img.shields.io/badge/License-ISC-blue.svg)',
    'IPL 1.0': '![IPL 1.0 License](https://img.shields.io/badge/License-IPL%201.0-blue.svg)'
  }

  return `<h1 align="center"> ${ data.title } </h1> 

<div align="center"> 

${ licenses[data.license] }
</div>
  
### Description
${ data.description }

${(data.table) ? tableOfContent : ''}

### Installation
${ data.installation }

### Usage
${ data.usage }

### License

Copyright (c) ${data.user}. All rights reserved.
Licensed under the [${ data.license } license](LICENSE.md).

### Credits

👤 **${data.user}** (author): [GitHub](https://github.com/${data.github})

### Contributing
${data.contributing}

### Test
${data.test}
### Questions

 For more information, additional questions or comments, contact [${data.user}](https://github.com/${data.github}).

`;
}

module.exports = generateMarkdown;


//testing:
// const data = {
//   title: "Project Readme",
//   description: "Here is an placeholder for description.",
//   table: true,
//   installation: "This is a placeholder for description.",
//   usage: "Placeholder for usage.",
//   license: "MIT",
//   user: 'Andres Acosta',
//   github: 'acosta-andres-r',
//   contributing: 'By participating in this project, you agree to abide by Contributor Convenant guidelines.',
//   test: '```node index.js```'
// }

// console.log(generateMarkdown(data));
const inquirer = require('inquirer');
const { exec } = require("child_process");

const mainMenu = {
  name: "operation",
  message: "What Git operation would you like to perform?",
  type: "list",
  choices: ["New Branch"]
}

const menuFunctions = {
  "New Branch": async () => {
    const { branchType } = await inquirer.prompt([{
        name: "branchType",
        message: "What type of branch would you like to create?",
        type: "list",
        choices: ["feature", "bugfix", "hotfix", "release"]
      }])
    const { branchName } = await inquirer.prompt([{
        name: "branchName",
        message: "What is the exact name of the task on Jira?",
        type: "input"
    }])
    const formattedBranchName = branchName.replace(/\s/g, '-').toLowerCase();

    // Update local repository before creating new branch
    exec("git checkout dev")
    exec("git pull")

    // Create new branch and push to remote
    exec(`git checkout -b ${branchType}/${formattedBranchName}`)
    exec(`git push -u origin ${branchType}/${formattedBranchName}`)
  
    console.log(`Branch ${branchType}/${formattedBranchName} created and pushed to origin`)
    console.log(`You are now on branch ${branchType}/${formattedBranchName}`)
  }
}

const main = async () => {
  const { operation } = await inquirer.prompt(mainMenu);
  menuFunctions[operation]();
}

main()
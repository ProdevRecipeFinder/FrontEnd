const inquirer = require('inquirer');
const { exec } = require("child_process");
const util = require('util')

const execPromise = util.promisify(exec);

const mainMenu = {
  name: "operation",
  message: "What Git operation would you like to perform?",
  type: "list",
  choices: ["New Branch", "Graph Log", "Exit"]
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

    try {
      // Update local repository before creating new branch")
      try {
        await execPromise("git checkout dev");
      } catch (e) {}
      await execPromise("git pull");
      await execPromise(`git checkout -b ${branchType}/${formattedBranchName}`);
      await execPromise(`git push -u origin ${branchType}/${formattedBranchName}`);
    } catch (e) {
      console.log(e.stderr)
      return
    }

    console.log(`Branch ${branchType}/${formattedBranchName} created and pushed to origin`)
    console.log(`You are now on branch ${branchType}/${formattedBranchName}`)
  },
  "Graph Log": async () => {
    const { stdout, stderr } = await execPromise("git log --graph --oneline --all")
    console.log(stdout)
    if (stderr) {
      console.log(stderr)
    }

    console.log("Run the following command to see this graph log in colour: git log --graph --oneline --all")
  },
  "Exit": () => {
    console.log("Exiting Git Helper")
    process.exit(0)
  }
}

const main = async () => {
  const { operation } = await inquirer.prompt(mainMenu);
  menuFunctions[operation]();
}

main()
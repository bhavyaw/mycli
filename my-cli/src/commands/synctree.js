const {Command, flags} = require('@oclif/command');
const fs = require("fs");

// @priority high
//TODO - Able to use relative paths as well 
// relative to the current directory - that would be amazing

class SyncTreeCommand extends Command {
  static description = "Sync target directory with source directory";
  static usage = 'my-cli sync-tree sourceDirectoryPath (string) TargetDirectoryPath (string )';

  static args = [
    {
      name: 'target',               // name of arg to show in help and reference with args[name]
      required: true,            // make the arg required with `required: true`
      description: 'Absolute Target Directory Path', // help description
      hidden: false,               // hide this arg from help
    }, {
      name : 'source',
      required : true,
      description : 'Absolute Source Directory Path',
      hidden : false,
      // default - current directory
      default : './'
    }
  ]

  async run() {
    const {args} = this.parse(SyncTreeCommand)
    console.log(`running my command with args: ${args.firstArg}, ${args.secondArg}`);

    // target directory checks
    this.checkDirectory(args.target)
    this.checkDirectory(args.source);



    // source directory checks

    const name = flags.name || 'world'
    this.log(`hello ${name} from C:\\Users\\bhavy\\Desktop\\Projects\\OSS-Projects\\my-cli\\my-cli\\src\\commands\\sync-tree.js`)
  }

  checkDirectory (directoryPath, directoryType) {
    try {
      const stats = fs.statSync(directoryPath);

      if (!stats.isDirectory()) {
        this.error(`${directoryType} is not a directory. Please enter a valid directory path`);
      }
    } catch (error) {
      this.error(`${directoryType} is incorrect. Please check the path again.`)
    }
  }
}

SyncTreeCommand.description = `Describe the command here
...
Extra documentation goes here
`

SyncTreeCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = SyncTreeCommand

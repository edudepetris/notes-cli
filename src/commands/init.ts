import * as shell from 'shelljs'
import * as path from 'path'
import {Command, flags} from '@oclif/command'

export default class Init extends Command {
  static description = 'Create an empty Notes repository or reinitialize an existing one.'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    // check if I have permission to write
    const folderPath = '.devnotes'
    const filePath = path.join(folderPath, 'notes.md')
    const hasGitignore = shell.ls('-A', '.gitignore').code === 0

    shell.mkdir('-p', folderPath)
    shell.touch(filePath)

    if (hasGitignore) {
      // if .gitignore already has .devnotes don't add it again.
      const gitignore = shell.cat('.gitignore').toString()
      const hasDevnotes = gitignore.includes('.devnotes')

      if (!hasDevnotes) {
        const newLine = new shell.ShellString('\n')
        const toIgnore = new shell.ShellString(folderPath)

        newLine.toEnd('.gitignore')
        toIgnore.toEnd('.gitignore')
      }
    }

    this.log('🤟 done!')
  }
}

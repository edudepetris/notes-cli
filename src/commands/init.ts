import * as shell from 'shelljs'
import {Command, flags} from '@oclif/command'

import {rootDir, notesFilePath} from '../utils/constants'

const SUCCESS = 0

const createStructure = () => {
  shell.mkdir('-p', rootDir)
  shell.touch(notesFilePath)
}

const addToGitignore = () => {
  const hasGitignore = shell.ls('-A', '.gitignore').code === SUCCESS

  if (hasGitignore) {
    const gitignore = shell.cat('.gitignore').toString()
    const hasDevnotes = gitignore.includes(rootDir)

    if (!hasDevnotes) {
      const newLine = new shell.ShellString('\n')
      const toIgnore = new shell.ShellString(rootDir)

      newLine.toEnd('.gitignore')
      toIgnore.toEnd('.gitignore')
    }
  }
}

export default class Init extends Command {
  static description = 'Create an empty Notes repository or reinitialize an existing one.'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    createStructure()
    addToGitignore()

    this.log('🤟 done!')
  }
}

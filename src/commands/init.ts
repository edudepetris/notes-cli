import * as shell from 'shelljs'
import {Command, flags} from '@oclif/command'
import * as fs from 'fs'

import {rootDir, notesFilePath} from '../utils/constants'

const SUCCESS = 0

const checkPermission = (ctx: any) => {
  try {
    fs.accessSync('.', fs.constants.W_OK)
  } catch (_) {
    const pwd = shell.pwd().toString()
    const error = `Permission denied for creation on ${pwd}`
    const suggestion = `give write permission to ${pwd}`

    ctx.error(error, {exit: 1, suggestions: [suggestion]})
  }
}

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
    checkPermission(this)
    createStructure()
    addToGitignore()

    this.log('🤟 done!')
  }
}

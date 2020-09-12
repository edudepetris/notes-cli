import {Command, flags} from '@oclif/command'
import * as shell from 'shelljs'
import * as fs from 'fs'
import * as path from 'path'

import {rootDir, notesFilePath, configFilePath} from '../utils/constants'

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
  shell.touch(configFilePath)
}

const identifyProject = () => {
  const currentPath = shell.pwd().toString()
  const name = currentPath.split(path.sep).pop()

  const data = {
    project: {
      name,
    },
  }

  const stringData = JSON.stringify(data)

  const identity = new shell.ShellString(stringData)
  identity.toEnd(configFilePath)
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
    identifyProject()
    addToGitignore()

    this.log('🤟 done!')
  }
}

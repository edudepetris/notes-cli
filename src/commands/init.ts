import {Command, flags} from '@oclif/command'
import * as fs from 'fs-extra'
import * as path from 'path'

import {rootDir, notesFilePath, localConfigFilePath} from '../utils/constants'

const checkPermission = (ctx: any) => {
  try {
    fs.accessSync('.', fs.constants.F_OK & fs.constants.W_OK)
  } catch (_) {
    const workingDir = process.cwd()
    const error = `Permission denied for creation on ${workingDir}`
    const suggestion = `give write permission to ${workingDir}`

    ctx.error(error, {exit: 1, suggestions: [suggestion]})
  }
}

const createStructure = () => {
  fs.ensureFileSync(notesFilePath)
  fs.ensureFileSync(localConfigFilePath)
}

const identifyProject = () => {
  const currentPath = process.cwd()
  const name = currentPath.split(path.sep).pop()

  const data = {
    project: {
      name,
    },
  }

  fs.writeJsonSync(localConfigFilePath, data)
}

const addToGitignore = () => {
  const hasGitignore = fs.pathExistsSync('.gitignore')

  if (hasGitignore) {
    const gitignore = fs.readFileSync('.gitignore', 'utf8')
    const hasDevnotes = gitignore.includes(rootDir)

    if (!hasDevnotes) {
      fs.appendFileSync('.gitignore', rootDir)
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

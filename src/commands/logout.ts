import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import * as fs from 'fs-extra'
import * as path from 'path'
import {logout} from '../utils/api'

export default class Logout extends Command {
  static description = 'clears local login credentials and invalidates API session'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    cli.action.start('Logging out')

    // we can create this file during the init.
    const configPath = path.join(this.config.configDir, 'config.json')

    const config = await fs.readJson(configPath)
    const email = config.email
    const token = config.token

    const headers = {
      Authorization: token,
    }

    await logout(headers)

    // remove user credentials.
    await fs.ensureDir(this.config.configDir)
    await fs.writeJson(configPath, {
      email: '',
      token: '',
    })

    cli.action.stop()
    this.log(`Logged out as: ${email}`)
  }
}

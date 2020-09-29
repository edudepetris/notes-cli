import {Command, flags} from '@oclif/command'
import * as fs from 'fs-extra'
import * as path from 'path'
import cli from 'cli-ux'
import {login} from '../utils/api'

export default class Login extends Command {
  static description = 'login with yours Devnotes credentials'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    const email = await cli.prompt('Email')
    const password = await cli.prompt('Password', {type: 'hide'})
    const user = {user: {email, password}}

    cli.action.start('Logging in')

    const {status, data, headers} = await login(user)

    if (status === 401) {
      this.warn(data.message)
      this.exit(1)
    }

    // save the credentials on cofig.
    // auth.set(ctx, {email, token})
    const config = path.join(this.config.configDir, 'config.json')
    await fs.ensureDir(this.config.configDir)
    await fs.writeJson(config, {
      email: email,
      token: headers.authorization,
    })

    cli.action.stop()
    this.log(`Logged in as: ${email}`)
  }
}

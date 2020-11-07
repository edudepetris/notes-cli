import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import {login} from '../utils/api'
import GlobalStore from '../utils/GlobalStore'

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

    const store = new GlobalStore(this)

    store.setAuth({
      email,
      token: headers.authorization,
    })

    cli.action.stop()
    this.log(`Logged in as: ${email}`)
  }
}

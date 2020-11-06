import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import {logout} from '../utils/api'
import GlobalStore from '../utils/GlobalStore'

export default class Logout extends Command {
  static description = 'clears local login credentials and invalidates API session'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    cli.action.start('Logging out')

    const store = new GlobalStore(this)
    store.init()

    const {email, token} = store.getAuth()

    const headers = {
      Authorization: token,
    }

    logout(headers)

    // remove user credentials.
    store.setAuth({email: '', token: ''})

    cli.action.stop()
    this.log(`Logged out as: ${email}`)
  }
}

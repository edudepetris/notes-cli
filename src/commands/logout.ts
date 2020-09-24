import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'

export default class Logout extends Command {
  static description = 'clears local login credentials and invalidates API session'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    cli.action.start('Logging out')
    // login actions here ...
    await cli.wait(3000)

    cli.action.stop()
  }
}

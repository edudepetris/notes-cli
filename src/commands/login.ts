import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'

export default class Login extends Command {
  static description = 'login with yours Devnotes credentials'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  async run() {
    const {flags} = this.parse(Login)

    const email = await cli.prompt('Email')
    const password = await cli.prompt('Password', {type: 'hide'})

    cli.action.start('Logging in')
    // login actions here ...
    await cli.wait(3000)

    cli.action.stop()

    // add green color to email.
    this.log(`Logged in as: ${email}`)
  }
}

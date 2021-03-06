import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import GlobalStore from '../utils/GlobalStore'
import {create, update} from '../utils/api'
import {getProject, setProject, getNotes} from '../utils/localStore'

const errorHandler = (error: any) => {
  if (error.code === 'ENOENT') {
    throw new Error('missing call init()')
  }
  throw error
}

export default class Push extends Command {
  static description = 'push your notes to dovenotes hub'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    cli.action.start('Pushing')

    const gstore = new GlobalStore(this)

    const {email, token} = gstore.getAuth()
    const isLoggedIn = email && token

    if (!isLoggedIn) {
      this.warn('login is required')
      this.warn('$ devnotes login')
      this.exit(1)
    }

    const headers = {
      Authorization: token,
    }

    const {id, name} = getProject()

    const content = getNotes()

    const postData = {
      note: {
        project_name: name,
        content,
      },
    }

    if (id) {
      const {status, data} = await update(id, postData, headers)

      if (status >= 300) {
        this.error(data.message)
        this.exit(1)
      }

      try {
        setProject({pushed_at: data.updated_at})
      } catch (error) {
        errorHandler(error)
      }
    } else {
      const {status, data} = await create(postData, headers)

      if (status >= 300) {
        this.error(data.message)
        this.exit(1)
      }

      try {
        setProject({
          id: data.id,
          name: data.project_name,
          pushed_at: data.updated_at,
        })
      } catch (error) {
        errorHandler(error)
      }
    }

    cli.action.stop()
  }
}

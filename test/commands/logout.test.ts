import {expect, test} from '@oclif/test'
import * as api from '../../src/utils/api'

import GlobalStore from '../../src/utils/GlobalStore'
import * as Config from '@oclif/config'

const success = {status: 200}

describe('login', () => {
  context('success logged out', () => {
    test
    .stdout()
    .stub(api, 'logout', () => (success))
    .do(async () => {
      // simulate an user logged in.

      // It doesn't looks good. The config has the wrong ctx,
      // cause of that I need to do this workaround.
      const config = await Config.load()
      const dirname = config.dirname
      const configDir = config.configDir.replace(dirname, 'devnotes-cli')

      const ctx = {
        config: {
          configDir,
        },
      }

      const store = new GlobalStore(ctx)

      store.setAuth({
        email: 'yoda@devnotes.com',
        token: 'token',
      })
    })
    .command(['logout'])
    .it('removes user credentials', async ctx => {
      const store = new GlobalStore(ctx)

      const config = await store.getAuth()
      expect(config).to.include({email: '', token: ''})
    })
  })
})

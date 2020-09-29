import {expect, test} from '@oclif/test'
import * as api from '../../src/utils/api'
import * as fs from 'fs-extra'
import * as path from 'path'

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
      const wrongConfigPath = path.join(config.configDir, 'config.json')
      const dirname = config.dirname
      const configPath = wrongConfigPath.replace(dirname, 'devnotes-cli')

      await fs.writeJson(configPath, {
        email: 'yoda@devnotes.com',
        token: 'token',
      })
    })
    .command(['logout'])
    .it('removes user credentials', async ctx => {
      const configPath = path.join(ctx.config.configDir, 'config.json')

      const config = await fs.readJson(configPath)
      expect(config).to.include({email: '', token: ''})
    })
  })
})

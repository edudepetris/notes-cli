import {expect, test} from '@oclif/test'
import cli from 'cli-ux'
import * as api from '../../src/utils/api'
import * as fs from 'fs-extra'
import * as path from 'path'

const success = {status: 200, headers: {authorization: 'token'}}
const fail = {status: 401, data: {message: 'bad credentials'}}

describe('login', () => {
  context('success logged in', () => {
    test
    .stdout()
    .stub(cli, 'prompt', () => async () => 'yoda@devnotes.com')
    .stub(api, 'login', () => (success))
    .command(['login'])
    .it('saves user credentials', async ctx => {
      const configPath = path.join(ctx.config.configDir, 'config.json')
      const config = await fs.readJson(configPath)
      expect(config).to.include({email: 'yoda@devnotes.com', token: 'token'})
    })

    test
    .stdout()
    .stub(cli, 'prompt', () => async () => 'yoda@devnotes.com')
    .stub(api, 'login', () => (success))
    .command(['login'])
    .it('shows a success message', ctx => {
      expect(ctx.stdout).to.contain('Logged in as: yoda@devnotes.com')
    })
  })

  context('unsuccess logged in', () => {
    test
    .stdout()
    .stderr()
    .stub(cli, 'prompt', () => async () => 'yoda@devnotes.com')
    .stub(api, 'login', () => (fail))
    .command(['login'])
    .exit(1)
    .it('shows a fail message', ctx => {
      expect(ctx.stderr).to.contain('bad credentials')
    })
  })
})

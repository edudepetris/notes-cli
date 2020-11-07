import {expect, test} from '@oclif/test'
import cli from 'cli-ux'
import GlobalStore from '../../src/utils/GlobalStore'
import * as api from '../../src/utils/api'

const success = {status: 200, headers: {authorization: 'token'}}
const fail = {status: 401, data: {message: 'bad credentials'}}

describe('login', () => {
  context('success logged in', () => {
    test
    .stdout()
    .stub(cli, 'prompt', () => async () => 'yoda@devnotes.com')
    .stub(api, 'login', () => (success))
    .command(['login'])
    .it('saves user credentials', ctx => {
      const store = new GlobalStore(ctx)
      const auth = store.getAuth()

      expect(auth).to.include({email: 'yoda@devnotes.com', token: 'token'})
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

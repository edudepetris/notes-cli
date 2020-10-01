import {expect} from '@oclif/test'
import * as sinon from 'sinon'

import GlobalStore from '../../../src/utils/GlobalStore'
import {globalConfigFileName} from '../../../src/utils/constants'

import * as path from 'path'
import * as fs from 'fs-extra'

const ctx = {
  config: {
    configDir: '../../test_root_project/global_config/',
  },
}
const configPath = path.join(ctx.config.configDir, globalConfigFileName)

describe('GlobalStore', () => {
  const data = {email: 'yoda@devnotes.com', token: 'token'}

  /* eslint-disable no-new */
  it('ensures a global config file', async () => {
    new GlobalStore(ctx)
    const exists = await fs.pathExists(configPath)

    expect(exists).to.be.true
  })
  /* eslint-enable no-new */

  context('User auth', () => {
    describe('#setAuth', () => {
      it('saves data in global config file', async () => {
        const store = new GlobalStore(ctx)
        await store.setAuth(data)

        const {email, token} = await fs.readJSON(configPath)

        expect(email).to.be.equal(data.email)
        expect(token).to.be.equal(data.token)
      })
      it('returs true when success', async () => {
        const store = new GlobalStore(ctx)
        const result = await store.setAuth(data)

        expect(result).to.be.true
      })
      it('returns false when fails', async () => {
        const error = new Error('boom')
        sinon.stub(fs, 'writeJson').throws(error)

        const store = new GlobalStore(ctx)
        const result = await store.setAuth(data)

        expect(result).to.be.false

        sinon.restore()
      })
    })
    describe('#getAuth', () => {
      it('returns from global config file', async () => {
        sinon.stub(fs, 'readJson').resolves(data)

        const store = new GlobalStore(ctx)
        const result = await store.getAuth()

        expect(result).to.include(data)

        sinon.restore()
      })

      it('returns {} when fails', async () => {
        const error = new Error('boom')
        sinon.stub(fs, 'readJson').throws(error)

        const store = new GlobalStore(ctx)
        const result = await store.getAuth()

        expect(result).to.be.empty

        sinon.restore()
      })
    })
  })
})

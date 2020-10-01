import {expect} from '@oclif/test'
import * as sinon from 'sinon'

import GlobalStore from '../../../src/utils/GlobalStore'
import {globalConfigFileName} from '../../../src/utils/constants'

import * as path from 'path'
import * as fs from 'fs-extra'

// an instance of oclif/config
const ctx = {
  config: {
    configDir: '../test_root_project/global_config',
  },
}
const configPath = path.join(ctx.config.configDir, globalConfigFileName)

describe('GlobalStore', () => {
  const data = {email: 'yoda@devnotes.com', token: 'token'}

  beforeEach(async () => {
    try {
      await fs.emptyDir('../test_root_project/')
    } catch {}
  })

  describe('#init', () => {
    it('ensures a global config file', async () => {
      const store = new GlobalStore(ctx)
      await store.init()
      const exists = await fs.pathExists(configPath)

      expect(exists).to.be.true
    })
  })

  context('User auth', () => {
    describe('#setAuth', () => {
      it('saves data in global config file', async () => {
        const store = new GlobalStore(ctx)
        await store.init()
        await store.setAuth(data)

        const {email, token} = await fs.readJSON(configPath)

        expect(email).to.be.equal(data.email)
        expect(token).to.be.equal(data.token)
      })
      it('returs true when success', async () => {
        const store = new GlobalStore(ctx)
        await store.init()
        const result = await store.setAuth(data)

        expect(result).to.be.true
      })
      it('throws an err when missing init()', async () => {
        const store = new GlobalStore(ctx)
        let msg = ''

        try {
          await store.setAuth(data)
        } catch (error) {
          msg = error.message
        }

        expect(msg).to.be.eq('missing call init()')
      })
    })

    describe('#getAuth', () => {
      it('returns from global config file', async () => {
        sinon.stub(fs, 'readJson').resolves(data)

        const store = new GlobalStore(ctx)
        await store.init()
        const result = await store.getAuth()

        expect(result).to.include(data)

        sinon.restore()
      })

      it('throws an erro when missing init()', async () => {
        const store = new GlobalStore(ctx)

        let msg = ''

        try {
          await store.getAuth()
        } catch (error) {
          msg = error.message
        }

        expect(msg).to.be.eq('missing call init()')
      })
    })
  })
})

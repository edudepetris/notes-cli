import {expect} from '@oclif/test'
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

  beforeEach(() => {
    fs.emptyDirSync('../test_root_project/')
  })

  describe('#init', () => {
    it('ensures a global config file', () => {
      const store = new GlobalStore(ctx)
      store.init()
      const exists = fs.pathExistsSync(configPath)

      expect(exists).to.be.true
    })
  })

  context('User auth', () => {
    describe('#setAuth', () => {
      it('saves data in global config file', () => {
        const store = new GlobalStore(ctx)
        store.init()
        store.setAuth(data)

        const {user} = fs.readJSONSync(configPath)
        expect(user.email).to.be.equal(data.email)
        expect(user.token).to.be.equal(data.token)
      })
      it('returs true when success', () => {
        const store = new GlobalStore(ctx)
        store.init()
        const result = store.setAuth(data)

        expect(result).to.be.true
      })
      it('throws an err when missing init()', () => {
        const store = new GlobalStore(ctx)
        let msg = ''

        try {
          store.setAuth(data)
        } catch (error) {
          msg = error.message
        }

        expect(msg).to.be.eq('missing call init()')
      })
    })

    describe('#getAuth', () => {
      it('returns from global config file', () => {
        fs.outputJSONSync(configPath, {user: data})

        const store = new GlobalStore(ctx)
        store.init()
        const result = store.getAuth()

        expect(result).to.include(data)
      })

      it('returns blank when the file is empty', () => {
        fs.outputJSONSync(configPath, {})

        const store = new GlobalStore(ctx)
        store.init()
        const result = store.getAuth()

        expect(result).to.include({email: undefined, token: undefined})
      })

      it('throws an erro when missing init()', () => {
        const store = new GlobalStore(ctx)

        let msg = ''

        try {
          store.getAuth()
        } catch (error) {
          msg = error.message
        }

        expect(msg).to.be.eq('missing call init()')
      })
    })
  })
})

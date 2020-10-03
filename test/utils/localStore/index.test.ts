import {expect} from '@oclif/test'
import {configFilePath, notesFilePath} from '../../../src/utils/constants'
import * as fs from 'fs-extra'
import {getProject, setProject, getNotes} from '../../../src/utils/localStore'

describe('localStore', () => {
  const dummy = {
    project: {
      name: 'dummy',
      id: 101,
      pushed_at: '2020-10-03T00:12:23.094Z'
    }
  }

  beforeEach(() => fs.ensureFileSync(configFilePath))

  describe('getProject', () => {
    it('returns the project', async () => {
      // We need dummy data on
      // ./devnotes/config.json
      fs.writeJsonSync(configFilePath, dummy)

      expect(getProject()).to.contain(dummy.project)
    })
    it('returns {} when no data', () => {
      // We need dummy data on
      // ./devnotes/config.json
      fs.writeJsonSync(configFilePath, {})

      expect(getProject()).to.be.empty
    })
  })

  describe('setProject', () => {
    it('returns the new project', () => {
      // We need dummy data on
      // ./devnotes/config.json
      fs.writeJsonSync(configFilePath, dummy)
      const fresh = setProject({name: 'fresh'})

      expect(fresh).to.contain({name: 'fresh'})
    })
    it('saves on config file', () => {
      const expected = {...dummy.project, ...{name: 'fresh'}}

      // We need dummy data on
      // ./devnotes/config.json
      fs.writeJsonSync(configFilePath, dummy)

      setProject({name: 'fresh'})
      const data = fs.readJsonSync(configFilePath)

      expect(data.project).to.contain(expected)
    })
  })

  describe('getNotes', () => {
    it('returns the content of notes.md', () => {
      // We need content on
      // ./devnotes/notes.md
      fs.ensureFileSync(notesFilePath)
      fs.writeJsonSync(notesFilePath, "# Title")

      expect(getNotes()).to.contain("# Title")
    })
  })
})

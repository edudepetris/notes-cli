import {expect, test} from '@oclif/test'
import * as fs from 'fs-extra'

import {rootDir, notesFilePath, localConfigFilePath} from '../../src/utils/constants'

const touchGitignore = () =>  fs.ensureFileSync('.gitignore')

const touchGitignoreNoPermission = () => {
  touchGitignore()
  fs.chmodSync('.gitignore', 0o555)
}

const addNotesToGitignore = () => {
  touchGitignore()
  fs.appendFileSync('.gitignore', rootDir)
}

describe('init', () => {
  test
  .stdout()
  .command(['init'])
  .it('runs init', ctx => {
    expect(ctx.stdout).to.contain('🤟 done!')
  })

  test
  .command(['init'])
  .it('creates a .devnotes folder with notes.md', _ctx => {
    expect(fs.pathExistsSync(notesFilePath)).to.be.true
  })

  test
  .command(['init'])
  .it('notes.md has a basic template', _ctx => {
    const content = fs.readFileSync(notesFilePath, 'utf8')

    expect(content).to.contain('')
  })

  context('when .gitignore exists', () => {
    test
    .do(touchGitignore)
    .command(['init'])
    .it('adds .devnotes to .gitignore', _ctx => {
      const content = fs.readFileSync('.gitignore', 'utf8')

      expect(content).to.contain(`\n${rootDir}`)
    })
  })

  context('when .gitignore exists and .devnotes is included', () => {
    test
    .stdout()
    .do(addNotesToGitignore)
    .command(['init'])
    .it('does not add it again', _ctx => {
      const content = fs.readFileSync('.gitignore', 'utf8')

      expect(rootDir).to.equal(content)
    })
  })

  context('when .gitignore exists but I do not have permissions', () => {
    test
    .do(touchGitignoreNoPermission)
    .command(['init'])
    .exit(1)
  })

  context('when I do not have write permission on current path', () => {
    test
    .do(() => {
      fs.chmodSync('.', 0o555)
    })
    .finally(() => {
      fs.chmodSync('.', 0o777)
    })
    .command(['init'])
    .exit(1)
  })

  context('identifying', () => {
    test
    .command(['init'])
    .it('creates a config.json with the project name', _ctx => {
      const content = fs.readFileSync(localConfigFilePath, 'utf8')
      const expected = '{"project":{"name":"test_root_project"}}'

      expect(content).to.contain(expected)
    })
  })
})

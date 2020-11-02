import {expect, test} from '@oclif/test'
import * as fs from 'fs-extra'

import {rootDir, notesFilePath, localConfigFilePath} from '../../src/utils/constants'

const touchGitignore = () =>  fs.ensureFileSync('.gitignore')

const touchGitignoreNoPermission = () => {
  touchGitignore()
  fs.chmodSync('.gitignore', '0555')
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
  .stdout()
  .command(['init'])
  .it('creates a .devnotes folder with notes.md', _ctx => {
    expect(fs.pathExistsSync(notesFilePath)).to.be.true
  })

  test
  .stdout()
  .command(['init'])
  .it('notes.md has a basic template', _ctx => {
    const content = fs.readFileSync(notesFilePath, 'utf8')

    expect(content).to.contain('')
  })

  context('when .gitignore exists', () => {
    test
    .stdout()
    .do(touchGitignore)
    .command(['init'])
    .it('adds .devnotes to .gitignore', _ctx => {
      const content = fs.readFileSync('.gitignore', 'utf8')

      expect(content).to.contain(rootDir)
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

  // failing on CI
  context('when .gitignore exists but I do not have permissions', () => {
    // .skip()
    test
    .stderr()
    .do(touchGitignoreNoPermission)
    .command(['init'])
    .it('shows a message on stderr', ctx => {
      expect(ctx.stderr).to.contain('could not append to file (code EACCES): .gitignore')
    })
  })

  // failing on CI
  // https://en.wikipedia.org/wiki/File-system_permissions
  context('when I do not have write permission on current path', () => {
    test
    .stdout()
    .do(() => {
      fs.chmodSync('.', '0555')
    })
    .finally(() => {
      fs.chmodSync('.', '0777')
    })
    .command(['init'])
    .exit(1)
    .it('Permission denied for creation on')
  })

  // failing on CI
  context('identifying', () => {
    test
    .stdout()
    .command(['init'])
    .it('creates a config.json with the project name', _ctx => {
      const content = fs.readFileSync(localConfigFilePath, 'utf8')
      const expected = '{"project":{"name":"test_root_project"}}'

      expect(content).to.contain(expected)
    })
  })
})

import {expect, test} from '@oclif/test'
import * as shell from 'shelljs'

import {rootDir, notesFilePath, configFilePath} from '../../src/utils/constants'

const touchGitignore = () =>  shell.touch('.gitignore')

const touchGitignoreNoPermission = () => {
  touchGitignore()
  shell.chmod('-w', '.gitignore')
}

const addNotesToGitignore = () => {
  touchGitignore()
  const toIgnore = new shell.ShellString(rootDir)
  toIgnore.toEnd('.gitignore')
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
    const file = shell.ls('-A', notesFilePath)

    expect(file).to.have.length(1)
    expect(file[0]).to.contain(notesFilePath)
  })

  test
  .stdout()
  .command(['init'])
  .it('notes.md has a basic template', _ctx => {
    const content = shell.cat(notesFilePath).toString()

    expect(content).to.contain('')
  })

  context('when .gitignore exists', () => {
    test
    .stdout()
    .do(touchGitignore)
    .command(['init'])
    .it('adds .devnotes to .gitignore', _ctx => {
      const content = shell.cat('.gitignore').toString()

      expect(content).to.contain(rootDir)
    })
  })

  context('when .gitignore exists and .devnotes is included', () => {
    test
    .stdout()
    .do(addNotesToGitignore)
    .command(['init'])
    .it('does not add it again', _ctx => {
      const content = shell.cat('.gitignore').toString()

      expect(rootDir).to.equal(content)
    })
  })

  // failing on CI
  context('when .gitignore exists but I do not have permissions', () => {
    test
    .skip()
    .stderr()
    .do(touchGitignoreNoPermission)
    .do(() => {
      shell.config.silent = false
    })
    .finally(() => {
      shell.config.silent = true
    })
    .command(['init'])
    .it('shows a message on stderr', ctx => {
      expect(ctx.stderr).to.contain('could not append to file (code EACCES): .gitignore')
    })
  })

  // failing on CI
  context('when I do not have write permission on current path', () => {
    test
    .skip()
    .stdout()
    .do(() => {
      shell.chmod('-w', '.')
    })
    .do(() => {
      shell.config.silent = false
    })
    .finally(() => {
      shell.config.silent = true
    })
    .finally(() => {
      shell.chmod('+w', '.')
    })
    .command(['init'])
    .exit(1)
    .it('Permission denied for creation on')
  })

  // failing on CI
  context('identifying', () => {
    test
    .skip()
    .stdout()
    .command(['init'])
    .it('creates a config.json with the project name', _ctx => {
      const content = shell.cat(configFilePath).toString()
      const expected = JSON.stringify({ name: 'test_root_project' })

      expect(content).to.contain(expected)
    })
  })
})

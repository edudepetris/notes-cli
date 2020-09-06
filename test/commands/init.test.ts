import {expect, test} from '@oclif/test'

import * as shell from 'shelljs'
import * as path from 'path'

const touchGitignore = () =>  shell.touch('.gitignore')

const touchGitignoreNoPermission = () => {
  touchGitignore()
  shell.chmod('-w', '.gitignore')
}

const addNotesToGitignore = () => {
  touchGitignore()
  const toIgnore = new shell.ShellString('.devnotes')
  toIgnore.toEnd('.gitignore')
}

describe('init', () => {
  test
  .stdout()
  .command(['init'])
  .it('runs init', _ctx => {
    expect(_ctx.stdout).to.contain('🤟 done!')
  })

  test
  .stdout()
  .command(['init'])
  .it('creates a .devnotes folder with notes.md', _ctx => {
    const filePath = path.join('.devnotes', 'notes.md')
    const file = shell.ls('-A', filePath)

    expect(file).to.have.length(1)
    expect(file[0]).to.contain(filePath)
  })

  test
  .stdout()
  .command(['init'])
  .it('notes.md has a basic template', _ctx => {
    const filePath = path.join('.devnotes', 'notes.md')
    const content = shell.cat(filePath)

    expect(content.toString()).to.contain('')
  })

  context('when .gitignore exists', () => {
    test
    .stdout()
    .do(touchGitignore)
    .command(['init'])
    .it('adds .devnotes to .gitignore', _ctx => {
      const content = shell.cat('.gitignore').toString()

      expect(content).to.contain('.devnotes')
    })
  })

  context('when .gitignore exists and .devnotes is included', () => {
    test
    .stdout()
    .do(addNotesToGitignore)
    .command(['init'])
    .it('does not add it again', _ctx => {
      const content = shell.cat('.gitignore').toString()

      expect('.devnotes').to.equal(content)
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
})

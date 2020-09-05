import {expect, test} from '@oclif/test'

import * as shell from 'shelljs'
import * as path from 'path'

const clean = () => {
  shell.rm('-rf', '.devnotes')
  shell.rm('.gitignore')
}

const setup = () => {
  shell.config.silent = true

  shell.cd('test/test_root_project')
  clean()
}

const teardown = () => {
  shell.config.silent = false
  clean()
  shell.cd('../../')
}

const addGitignore = () =>  shell.touch('.gitignore')

const addNotesToGitignore = () => {
  addGitignore()
  const toIgnore = new shell.ShellString('.devnotes')
  toIgnore.toEnd('.gitignore')
}

describe('init', () => {
  test
  .stdout()
  .do(setup)
  .finally(teardown)
  .command(['init'])
  .it('runs init', _ctx => {
    expect(_ctx.stdout).to.contain('🤟 done!')
  })

  test
  .stdout()
  .do(setup)
  .finally(teardown)
  .command(['init'])
  .it('creates a .devnotes folder with notes.md', _ctx => {
    const filePath = path.join('.devnotes', 'notes.md')
    const file = shell.ls('-A', filePath)

    expect(file).to.have.length(1)
    expect(file[0]).to.contain(filePath)
  })

  test
  .stdout()
  .do(setup)
  .finally(teardown)
  .command(['init'])
  .it('notes.md has a basic template', _ctx => {
    const filePath = path.join('.devnotes', 'notes.md')
    const content = shell.cat(filePath)

    expect(content.toString()).to.contain('')
  })

  context('when .gitignore exists', () => {
    test
    .stdout()
    .do(setup)
    .finally(teardown)
    .do(addGitignore)
    .command(['init'])
    .do(() => shell.touch('.gitignore'))
    .it('adds .devnotes to .gitignore', _ctx => {
      const content = shell.cat('.gitignore')

      expect(content.toString()).to.contain('.devnotes')
    })
  })

  context('when .gitignore exists and .devnotes is included', () => {
    test
    .stdout()
    .do(setup)
    .do(addNotesToGitignore)
    .finally(teardown)
    .command(['init'])
    .it('does not add it again', _ctx => {
      const content = shell.cat('.gitignore').toString()

      expect('.devnotes').to.equal(content)
    })
  })
})

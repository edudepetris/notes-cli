import * as shell from 'shelljs'

const clean = () => {
  shell.rm('-rf', '.devnotes', '.gitignore')
}

const cdProjectTestRoot = () => {
  shell.cd('test/test_root_project/')
}
const cdProjectRoot = () => {
  shell.cd('../../')
}

before(() => {
  shell.config.silent = true
})
after(() => {
  shell.config.silent = false
})

beforeEach(cdProjectTestRoot)
beforeEach(clean)
afterEach(clean)
afterEach(cdProjectRoot)

import * as shell from 'shelljs'
import {rootDir} from '../src/utils/constants'

const clean = () => {
  shell.rm('-rf', rootDir, '.gitignore')
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

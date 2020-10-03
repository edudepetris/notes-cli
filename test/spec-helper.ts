import * as shell from 'shelljs'
import {rootDir} from '../src/utils/constants'

// This file is being hooked on mocha throught mocha.opts
//
// It sets the current test dir as '<root>/test/test_root_porject'
//
// Every test will run on that path.
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

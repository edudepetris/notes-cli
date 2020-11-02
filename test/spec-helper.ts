import * as fs from 'fs-extra'
import {rootDir} from '../src/utils/constants'

// This file is being hooked on mocha throught mocha.opts
//
// It sets the current test dir as '<root>/test/test_root_porject'
//
// Every test will run on that path.
const clean = () => {
  fs.removeSync(rootDir)
  fs.removeSync('.gitignore')
}

const cdProjectTestRoot = () => {
  process.chdir('test/test_root_project/');
}
const cdProjectRoot = () => {
  process.chdir('../../');
}

beforeEach(cdProjectTestRoot)
beforeEach(clean)
afterEach(clean)
afterEach(cdProjectRoot)

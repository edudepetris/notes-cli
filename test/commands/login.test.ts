import {expect, test} from '@oclif/test'

describe('login', () => {
  test
  .skip()
  .stdout()
  .command(['login'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .skip()
  .stdout()
  .command(['login', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})

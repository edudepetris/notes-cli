import {expect, test} from '@oclif/test'

describe('logout', () => {
  test
  .skip()
  .stdout()
  .command(['logout'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .skip()
  .stdout()
  .command(['logout', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})

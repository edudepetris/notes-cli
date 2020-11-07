import {expect, test} from '@oclif/test'
import * as fs from 'fs-extra'
import {localConfigFilePath, notesFilePath} from '../../src/utils/constants'
import * as api from '../../src/utils/api'
import {getProject} from '../../src/utils/localStore'
import GlobalStore from '../../src/utils/GlobalStore'
import * as sinon from 'sinon'

const signIn = () => {
  const auth = {
    email: 'yoda@devnotes.com',
    token: 'sudo',
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  sinon.stub(GlobalStore.prototype, 'init').callsFake(() => {})
  sinon.stub(GlobalStore.prototype, 'getAuth').callsFake(() => auth)
}

const signOut = () => {
  const auth = {email: '', token: ''}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  sinon.stub(GlobalStore.prototype, 'init').callsFake(() => {})
  sinon.stub(GlobalStore.prototype, 'getAuth').callsFake(() => auth)
}

const createDummyProject = (opts?: any) => {
  // create dummy project
  const dummy = opts && opts.pushed ? ({
    project: {
      name: 'devnotes',
      id: 101,
      pushed_at: '2019-08-03T03:53:53.156Z',
      user_id: 1,
    },
  }) : ({
    project: {
      name: 'devnotes',
    },
  })

  fs.ensureFileSync(localConfigFilePath)
  fs.writeJsonSync(localConfigFilePath, dummy)

  // create fake content.
  fs.ensureFileSync(notesFilePath)
  fs.writeFileSync(notesFilePath, '# Title')
}

const success = {
  status: 200,
  data: {
    id: 101,
    content: '# title',
    project_name: 'devnotes',
    user_id: 1,
    updated_at: '2020-10-03T03:53:53.156Z',
  },
}

describe('push', () => {
  afterEach(() => sinon.restore())

  context('when project does not exist on cloud', () => {
    test
    .stdout()
    .do(signIn)
    .do(createDummyProject)
    .stub(api, 'create', () => (success))
    .command(['push'])
    .it('sets the project id & pushed_at', _ => {
      const {id, pushed_at} = getProject()

      expect(id).to.not.null
      expect(pushed_at).to.not.null
    })
  })

  context('when project exists on cloud', () => {
    test
    .stdout()
    .do(signIn)
    .do(() => createDummyProject({pushed: true}))
    .stub(api, 'update', () => (success))
    .command(['push'])
    .it('updates the pushed_at', _ => {
      const {pushed_at} = getProject()

      expect(pushed_at).to.be.eq(success.data.updated_at)
    })
  })

  context('when user is not logged in', () => {
    test
    .stderr()
    .do(signOut)
    .do(createDummyProject)
    .command(['push'])
    .exit(1)
    .it('exits with a message', ctx => {
      expect(ctx.stderr).to.include('login is required')
    })
  })
})


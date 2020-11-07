import * as fs from 'fs-extra'
import * as path from 'path'
import {globalConfigFileName} from '../constants'

// Example
//
//     // initialization.
//     const store = new GlobalStore(ctx)
//     store.init()
//
class GlobalStore {
  ctx: any

  #path: string

  constructor(ctx: any) {
    this.ctx = ctx

    this.#path = path.join(
      this.ctx.config.configDir,
      globalConfigFileName,
    )
  }

  init() {
    // Crate a empty json file iff it doesn't exists.
    const exists = fs.pathExistsSync(this.#path)
    if (!exists) {
      fs.outputJsonSync(this.#path, {})
    }
  }

  setAuth(userAuth: {email: string; token: string}): boolean {
    try {
      const config = fs.readJsonSync(this.#path)
      const user = {...config.user, ...userAuth}
      const data = {
        ...config,
        user,
      }

      fs.writeJsonSync(this.#path, data)
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error('missing call init()')
      }

      throw error
    }

    return true
  }

  getAuth(): {email: string; token: string} {
    try {
      const {user} = fs.readJsonSync(this.#path)

      return {
        email: (user && user.email),
        token: (user && user.token),
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error('missing call init()')
      }

      throw error
    }
  }
}

export default GlobalStore

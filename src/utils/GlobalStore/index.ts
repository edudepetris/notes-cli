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
    fs.ensureFileSync(this.#path)
  }

  setAuth(userAuth: any) {
    try {
      fs.writeJsonSync(this.#path, userAuth)
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error('missing call init()')
      }

      throw error
    }

    return true
  }

  getAuth() {
    try {
      const config = fs.readJsonSync(this.#path)

      return {
        email: config.email,
        token: config.token,
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

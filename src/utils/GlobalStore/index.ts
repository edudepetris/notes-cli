import * as fs from 'fs-extra'
import * as path from 'path'
import {globalConfigFileName} from '../constants'

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

  async init() {
    await fs.ensureFile(this.#path)
  }

  async setAuth(userAuth: any) {
    try {
      await fs.writeJson(this.#path, userAuth)
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error('missing call init()')
      }

      throw error
    }

    return true
  }

  async getAuth() {
    try {
      const config = await fs.readJson(this.#path)

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

import * as fs from 'fs-extra'
import * as path from 'path'
import {globalConfigFileName} from '../constants'

class GlobalStore {
  ctx: any
  #path: string 

  constructor(ctx: any) {
    this.ctx = ctx;
    
    this.#path = path.join(
      this.ctx.config.configDir,
      globalConfigFileName
    )

    fs.ensureFile(this.#path)
  }

  async setAuth(userAuth: any) {
    try {
      await fs.writeJson(this.#path, userAuth)
    }
    catch {
      return false
    }

    return true
  }

  async getAuth() {
    try {
      const config = await fs.readJson(this.#path)

      return {
        email: config.email,
        token: config.token
      }

    }
    catch {
      return {}
    }
  }
}

export default GlobalStore

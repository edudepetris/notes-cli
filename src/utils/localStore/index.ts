import * as fs from 'fs-extra'
import {configFilePath, notesFilePath} from '../constants'

// wrapper for manipulate data on
//  .devnotes/config.json
//  .devnotes/notes.md

const getProject = (): any => {
  fs.ensureFileSync(configFilePath)

  const localStoreData = fs.readJsonSync(configFilePath)
  return localStoreData.project || {}
}

const setProject = (project: any) => {
  fs.ensureFileSync(configFilePath)

  const data = fs.readJsonSync(configFilePath)
  const fresh = {...data.project, ...project}

  fs.writeJsonSync(configFilePath, {
    ...data,
    project: fresh,
  })

  return fresh
}

const getNotes = () => (fs.readFileSync(notesFilePath, 'utf8'))

export {
  getProject,
  setProject,
  getNotes,
}

import * as fs from 'fs-extra'
import {localConfigFilePath, notesFilePath} from '../constants'

// wrapper for manipulate data on
//  .devnotes/config.json
//  .devnotes/notes.md

const getProject = (): any => {
  fs.ensureFileSync(localConfigFilePath)

  const localStoreData = fs.readJsonSync(localConfigFilePath)
  return localStoreData.project || {}
}

const setProject = (project: any) => {
  fs.ensureFileSync(localConfigFilePath)

  const data = fs.readJsonSync(localConfigFilePath)
  const fresh = {...data.project, ...project}

  fs.writeJsonSync(localConfigFilePath, {
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

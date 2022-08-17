import { readArray, deleteItem, returnExisting } from "./array.js"

const newProject = (title, description) => {
  const project = []

  const createToDo = (toDo) => {
    project.push(toDo)
  }

  const readProject = () => {
    return project
  }

  const deleteToDo = (toDo) => {
    deleteItem(project, toDo)
  }

  const getTitle = () => returnExisting(title)
  const getDescription = () => returnExisting(description)

  return {
    createToDo,
    readProject,
    deleteToDo,
    getTitle,
    getDescription,
  }
}

export default newProject

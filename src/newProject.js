import { deleteItem, returnExisting } from "./array.js"

const newProject = (title, description) => {
  const project = []

  let id = null
  let projectList = null

  let nextToDoID = 0

  const myself = {}

  const createToDo = (toDo) => {
    project.push(toDo)
    toDo.setId(nextToDoID)
    nextToDoID++
    toDo.setProject(myself)
  }

  const readProject = () => {
    return project
  }

  const getToDoById = (todoid) => {
    for (const todo of project) {
      if (todo.getId() == todoid) return todo
    }
    return null
  }

  const deleteToDo = (toDo) => {
    deleteItem(project, toDo)
  }

  const setId = (value) => {
    id = value
  }

  const setProjectList = (value) => {
    projectList = value
  }

  const updateProject = (newTitle, newDescription) => {
    if (newTitle) title = newTitle
    if (newDescription) description = newDescription
  }

  const getTitle = () => returnExisting(title)
  const getDescription = () => returnExisting(description)
  const getId = () => id
  const getProjectList = () => projectList

  Object.assign(myself, {
    createToDo,
    readProject,
    deleteToDo,
    updateProject,
    getTitle,
    getDescription,
    getId,
    setId,
    getProjectList,
    setProjectList,
    getToDoById,
  })

  return myself
}

export default newProject

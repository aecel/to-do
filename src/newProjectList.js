import { readArray, deleteItem } from "./array.js"

const newProjectList = () => {
  const projects = []

  const createProject = (project) => {
    projects.push(project)
  }

  const readProjectList = () => {
    return projects
  }

  const deleteProject = (project) => {
    deleteItem(projects, project)
  }

  return {
    createProject,
    readProjectList,
    deleteProject,
  }
}

export default newProjectList

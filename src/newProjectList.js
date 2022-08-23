import { deleteItem } from "./array.js"

const newProjectList = () => {
  const projects = []

  const myself = {}

  const createProject = (project) => {
    projects.push(project)
    project.setId(projects.indexOf(project))
    project.setProjectList(myself)
  }

  const readProjectList = () => {
    return projects
  }

  const deleteProject = (project) => {
    deleteItem(projects, project)
  }

  Object.assign(myself, {
    createProject,
    readProjectList,
    deleteProject,
  })

  return myself
}

export default newProjectList

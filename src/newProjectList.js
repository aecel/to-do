import { deleteItem } from "./array.js"

const newProjectList = () => {
  const projects = []

  let nextProjectId = 0

  const myself = {}

  const createProject = (project) => {
    projects.push(project)
    project.setId(nextProjectId)
    nextProjectId++
    project.setProjectList(myself)
  }

  const readProjectList = () => {
    return projects
  }

  const getProjectById = (projectid) => {
    for (const project of projects) {
      if (project.getId() == projectid) return project
    }
  }

  const deleteProject = (project) => {
    deleteItem(projects, project)
  }

  Object.assign(myself, {
    createProject,
    readProjectList,
    getProjectById,
    deleteProject,
  })

  return myself
}

export default newProjectList

import {
  toggleClassDiv,
  toggleClassQuery,
  toggleClassQueryAll,
  hideDiv,
  hideDivQuery,
  showDiv,
  showDivQuery,
  showDivQueryAll,
  changeTextContent,
  clearChildren,
  hideDivQueryAll,
} from "./divFunctions.js"

import modalFunctions from "./modal.js"

import { checkListListener } from "./checklist.js"
import { toDoCircleListener, getToDoHTML } from "./toDo.js"
import addModalListeners from "./addModalListeners.js"
import { refreshProjectTabs } from "./projectTabs.js"
import newProject from "./newProject.js"
import {
  getProjectListData,
  storeProjectListData,
  getFromLocalStorage,
} from "./storage.js"

const addProjectModalListeners = () => {}

// Refresh project cards

const refreshProjectCards = (projectList) => {
  const projectCards = document.querySelector(".project-cards")
  clearChildren(projectCards)

  for (const project of projectList.readProjectList()) {
    appendProjectCard(project, false)
  }

  projectCardListeners(projectList)

  toggleClassQueryAll(".edit-project", "hide-div")
  toggleClassQueryAll(".delete-project", "hide-div")

  // Event listener for starting to delete projects
  const startDeleteProject = document.querySelector(".start-delete-project")
  startDeleteProject.addEventListener("click", startDeleteClicked)

  // Modal listener for deleting projects
  modalFunctions(
    ".delete-project-modal",
    ".delete-project",
    ".close-delete-project-modal",
    (modal, dataset) =>
      deleteProjectHtml(modal, projectList.getProjectById(dataset.projectid))
  )

  // Modal listener for editing projects
  modalFunctions(
    ".edit-project-modal",
    ".edit-project",
    ".close-edit-project-modal",
    (modal, dataset) =>
      editProjectHtml(
        modal,
        projectList.getProjectById(dataset.projectid),
        projectList
      )
  )

  // Modal listener for adding projects
  modalFunctions(
    ".add-project-modal",
    ".add-project",
    ".close-add-project-modal",
    (modal, dataset) => addProjectHtml(modal, projectList)
  )
}

const startDeleteClicked = () => {
  console.log("start delete clicked")
  toggleClassQueryAll(".project-card", "project-card-shake")
  toggleClassQueryAll(".edit-project", "hide-div")
  toggleClassQueryAll(".delete-project", "hide-div")
}

const addProjectHtml = (modal, projectList) => {
  const modalContent = modal.getElementsByClassName("modal-text")[0]

  const projectForm = document.getElementById("add-project-form")

  const submitForm = (event) => {
    event.preventDefault()
    const formData = new FormData(projectForm)

    const projectTitle = formData.get("add-project-title")
    const projectDescription = formData.get("add-project-description")

    if (projectTitle != "") {
      const addThisProject = newProject({
        title: projectTitle,
        description: projectDescription,
      })
      console.log("adding project to ", projectList.readProjectList())
      projectList.createProject(addThisProject)
    }

    refreshProjectCards(projectList)
    refreshProjectTabs(projectList)
    projectForm.reset()

    modal.style.display = "none"

    projectForm.removeEventListener("submit", submitForm)
  }

  projectForm.addEventListener("submit", submitForm)
}

const editProjectHtml = (modal, project, projectList) => {
  const modalContent = modal.getElementsByClassName("modal-text")[0]

  const projectForm = document.getElementById("edit-project-form")

  const oldTitle = `${project.getTitle()}`
  const oldDescription = `${project.getDescription()}`

  const inputTitle = document.getElementById("edit-project-title")
  const inputDescription = document.getElementById("edit-project-description")
  inputTitle.value = oldTitle
  inputDescription.value = oldDescription

  const submitForm = (event) => {
    event.preventDefault()
    const formData = new FormData(projectForm)

    const projectTitle = formData.get("edit-project-title")
    const projectDescription = formData.get("edit-project-description")

    // if (projectTitle != "") {
    //   const editThisProject = newProject(projectTitle, projectDescription)
    //   projectList.createProject(editThisProject)
    // }
    console.log("updating projectlist ", projectList.readProjectList())

    project.updateProject(projectTitle, projectDescription)

    refreshProjectCards(projectList)
    refreshProjectTabs(projectList)
    projectForm.reset()

    modal.style.display = "none"

    projectForm.removeEventListener("submit", submitForm)
  }

  projectForm.addEventListener("submit", submitForm)
}

const deleteProjectHtml = (modal, project) => {
  const modalContent = modal.getElementsByClassName("modal-text")[0]

  const yesButton = modal.getElementsByClassName("yes-button")[0]

  const onYesButtonClicked = () => {
    const projectList = project.getProjectList()
    projectList.deleteProject(project)

    refreshProjectCards(projectList)
    refreshProjectTabs(projectList)
    // Close modal
    modal.style.display = "none"

    // Remove Event Listener
    yesButton.removeEventListener("click", onYesButtonClicked)
  }

  yesButton.addEventListener("click", onYesButtonClicked)

  const noButton = modal.getElementsByClassName("no-button")[0]

  const onNoButtonClicked = () => {
    // Close modal
    modal.style.display = "none"

    noButton.removeEventListener("click", onNoButtonClicked)
  }

  noButton.addEventListener("click", onNoButtonClicked)
}

// --- Event Listeners for Project Cards ---

const projectCardListeners = (projectList) => {
  const projectCardList = document.getElementsByClassName("project-card")
  for (const projectCardElement of projectCardList) {
    const projectId = projectCardElement.dataset.index
    projectCardElement.addEventListener("click", () => {
      initializeProjectPage(projectList.getProjectById(projectId))
    })
  }
}

// Displays project page
const initializeProjectPage = (project) => {
  // Clear all project cards then expand the clicked project card
  const projectId = project.getId()

  const projectCards = document.querySelector(".project-cards")
  clearChildren(projectCards)
  appendProjectCard(project, true)

  // For UI, show/hide some buttons/divs
  toggleClassQuery(".project-card-container", "expand-project")
  toggleClassQuery(".project-card", "expand-project")
  hideDivQuery(".add-project")
  hideDivQueryAll(".delete-project")
  hideDivQueryAll(".start-delete-project")
  hideDivQueryAll(".save-data")
  hideDivQueryAll(".load-data")
  hideDivQueryAll(".edit-project")
  showDivQuery(".add-todo")
  // showDivQueryAll(".add-checklist")
  // showDivQueryAll(".edit-todo")
  // showDivQueryAll(".delete-todo")
  // showDivQueryAll(".edit-checklist")
  // showDivQueryAll(".delete-checklist")
  changeTextContent(".docket-title", project.getTitle())
  showDivQuery(".previous")
  document.querySelector(".project-card").style.cursor = "unset"
  toggleClassQueryAll(".checklist-entry", "checklist-entry-inside")
  toggleClassQueryAll(".project-card", "project-card-outside")

  toggleClassQueryAll(".project-card", "project-card-inside")

  toggleClassQueryAll(".checklist-circle", "circle-inside")
  toggleClassQueryAll(".to-do-circle", "circle-inside")
  toggleClassQueryAll(".to-do-entry", "to-do-entry-inside")

  // For showing to-do icons while hovering
  const hoverToDo = (toDo) => {
    const toDoIcons = toDo.getElementsByClassName("to-do-icon")
    for (const toDoIcon of toDoIcons) {
      console.log(`${toDoIcon.dataset.todoid}`)
      showDiv(toDoIcon)
    }
  }

  const unhoverToDo = (toDo) => {
    const toDoIcons = toDo.getElementsByClassName("to-do-icon")
    for (const toDoIcon of toDoIcons) {
      console.log(`${toDoIcon.dataset.todoid}`)
      hideDiv(toDoIcon)
    }
  }

  const toDos = document.getElementsByClassName("to-do-entry")
  for (const toDo of toDos) {
    toDo.addEventListener("mouseover", () => {
      hoverToDo(toDo)
    })
    toDo.addEventListener("mouseleave", () => {
      unhoverToDo(toDo)
    })
  }

  // For showing checklist icons while hovering
  const hoverChecklist = (checklist) => {
    const checklistIcons = checklist.getElementsByClassName("checklist-icon")
    for (const checklistIcon of checklistIcons) {
      console.log(`${checklistIcon.dataset.checkid}`)
      showDiv(checklistIcon)
    }
  }

  const unhoverChecklist = (checklist) => {
    const checklistIcons = checklist.getElementsByClassName("checklist-icon")
    for (const checklistIcon of checklistIcons) {
      console.log(`${checklistIcon.dataset.checkid}`)
      hideDiv(checklistIcon)
    }
  }

  const checklists = document.getElementsByClassName("checklist-entry")
  for (const checklist of checklists) {
    checklist.addEventListener("mouseover", () => {
      hoverChecklist(checklist)
    })
    checklist.addEventListener("mouseleave", () => {
      unhoverChecklist(checklist)
    })
  }

  // For choosing the tab to highlight
  const projectTabList = document.getElementsByClassName("project-tab")
  for (const projectTab of projectTabList) {
    projectTab.classList.remove("chosen-tab")
  }

  const chosenTab = document.querySelector(
    `.project-tab[data-index="${projectId}"]`
  )
  chosenTab.classList.add("chosen-tab")
}

const appendProjectCard = (project, attachListeners) => {
  const html =
    /*html*/
    `
      <div class="project-card-container">
        <div data-index="${project.getId()}" class="project-card project-card-outside">
          <div class="color-bar"></div>
          <div class="project-card-text">
            <div class="project-title">${project.getTitle()}</div>
            <div class="project-desc">${project.getDescription()}</div>
            <div class="line-dash"></div>
            
            ${getToDoHTML(project)}
    
            <div class="add-todo">
              <img src="./images/plus.svg" class="add-todo-icon" />
            </div>
          </div>
          
        </div>
        <div data-projectid="${project.getId()}" class="delete-project">
          <img src="./images/remove-white.svg" class="delete-project-icon" />
        </div>
        <div data-projectid="${project.getId()}" class="edit-project">
          <img src="./images/pencil-white.svg" class="edit-project-icon" />
        </div>
      </div>
      `

  const projectCards = document.querySelector(".project-cards")
  projectCards.innerHTML += html

  if (attachListeners) {
    // Add event listener for previous button
    previousButtonListener(project)

    // Add event listener for checklist circles
    checkListListener(project)

    // Add event listener for to do circles
    toDoCircleListener(project)

    addModalListeners(project)
  }
}

// -- Event Listener for previous button

const previousButtonListener = (project) => {
  const previous = document.querySelector(".previous")
  previous.addEventListener("click", () => previousButtonClicked(project))
}

// Event when previous button is clicked
const previousButtonClicked = (project) => {
  refreshProjectCards(project.getProjectList())

  // For UI, show/hide some buttons/divs
  showDivQuery(".add-project")

  showDivQuery(".start-delete-project")
  showDivQuery(".save-data")
  showDivQuery(".load-data")

  changeTextContent(".docket-title", "Docket")
  hideDivQuery(".previous")

  // For choosing the tab to highlight (which is the docket tab)
  const projectTabList = document.getElementsByClassName("project-tab")
  for (const projectTab of projectTabList) {
    projectTab.classList.remove("chosen-tab")
  }
  const docketTab = document.getElementById("docket-tab")
  docketTab.classList.add("chosen-tab")
}

export { refreshProjectCards, previousButtonClicked, initializeProjectPage }

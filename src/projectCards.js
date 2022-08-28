import {
  toggleClassDiv,
  toggleClassQuery,
  toggleClassQueryAll,
  hideDiv,
  hideDivQuery,
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

const addProjectModalListeners = () => {
  
}

// Refresh project cards

const refreshProjectCards = (projectList) => {
  const projectCards = document.querySelector(".project-cards")
  clearChildren(projectCards)

  for (const project of projectList.readProjectList()) {
    appendProjectCard(project, false)
    
  }

  projectCardListeners(projectList)

  // Modal listener for adding projects
  modalFunctions(
    ".add-project-modal",
    ".add-project",
    ".close-add-project-modal"
  )

  // Modal listener for deleting projects
  modalFunctions(
    ".delete-project-modal",
    ".delete-project",
    ".close-delete-project-modal",
    (modal, dataset) => deleteProjectHtml(modal, projectList.getProjectById(dataset.projectid))
  )
}

const deleteProjectHtml = (modal, project) => {
  const modalContent = modal.getElementsByClassName("modal-text")[0]

  const yesButton = modal.getElementsByClassName("yes-button")[0]

  const onYesButtonClicked = () => {
    // Delete in the UI
    // const projectContainers = document.getElementsByClassName(
    //   "project-card-container"
    // )
    // for (const projectContainer of projectContainers) {
    //   if (projectContainer.dataset.projectid == project.getId()) {
    //     projectContainer.parentElement.removeChild(projectContainer)
    //     break
    //   }
    // }

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
  showDivQuery(".add-todo")
  showDivQueryAll(".add-checklist")
  showDivQueryAll(".edit-todo")
  showDivQueryAll(".delete-todo")
  showDivQueryAll(".edit-checklist")
  showDivQueryAll(".delete-checklist")
  changeTextContent(".docket-title", project.getTitle())
  showDivQuery(".previous")
  document.querySelector(".project-card").style.cursor = "unset"
  toggleClassQueryAll(".checklist-entry", "checklist-entry-inside")
  toggleClassQueryAll(".to-do-entry", "to-do-entry-inside")

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
        <div data-index="${project.getId()}" class="project-card">
          <div class="color-bar"></div>
          <div class="project-card-text">
            <p class="project-title">${project.getTitle()}</p>
            <p class="project-desc">${project.getDescription()}</p>
            <div class="line-dash"></div>
            
            ${getToDoHTML(project)}
    
            <div class="add-todo">
              <img src="./images/plus.svg" class="add-todo-icon" />
            </div>
          </div>
          
        </div>
        <div data-projectid="${project.getId()}" class="delete-project">
          <img src="./images/remove.svg" class="delete-project-icon" />
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

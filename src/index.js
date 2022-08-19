import style from "./style.css"
import { deleteItem, returnExisting } from "./array.js"

import addToDoIconSvg from "./images/plus.svg"

import newProjectList from "./newProjectList.js"
import newProject from "./newProject.js"
import newToDo from "./newToDo.js"
import newCheckList from "./newCheckList.js"
import newCheckListEntry from "./newCheckListEntry.js"

import {
  toggleClassDiv,
  toggleClassQuery,
  hideDiv,
  hideDivQuery,
  showDivQuery,
  changeTextContent,
  clearChildren,
} from "./divFunctions.js"

// Project List > Project > To-Do > Checklist > Checklist Entry

// --- List all <blank> functions --- //

// List all project titles
const listAllProjects = (projectList) => {
  return projectList.readProjectList().map((project) => {
    return project.getTitle()
  })
}

// List all to-do titles and due dates
const listToDos = (project) => {
  return project.readProject().map((toDo) => {
    return [toDo.getTitle(), toDo.getDueDate()]
  })
}

// List all checklist entry texts and checked-s
const listCheckList = (toDo) => {
  // Check if checklist exists in the todo
  // (false is the default value for .getCheckList() because idk I'm dumb)
  if (toDo.getCheckList() !== false) {
    return toDo
      .getCheckList()
      .readCheckList()
      .map((item) => {
        return [item.getText(), item.getChecked(), item.getEntry()]
      })
  }
}

// --- Event Listeners for Project Cards ---

const projectCardListeners = () => {
  const projectCardList = document.getElementsByClassName("project-card")
  for (const projectCard of projectCardList) {
    projectCard.addEventListener("click", () => {
      projectClicked(projectCard)
    })
  }
}

// Event when a project card is clicked
const projectClicked = (chosenProject) => {
  const chosenIndex = chosenProject.dataset.index
  const project = myDocket.readProjectList()[chosenIndex]

  // Clear all project cards then expand the clicked project card
  clearChildren(projectCards)
  appendProjectCard(project)

  // For UI, show/hide some buttons/divs
  toggleClassQuery(".project-card", "expand-project")
  hideDivQuery(".add-project")
  showDivQuery(".add-todo")
  changeTextContent(".docket-title", project.getTitle())
  showDivQuery(".previous")
  document.querySelector(".project-card").style.cursor = "unset"

  // Add event listener for previous button
  previousButtonListener()

  // For choosing the tab to highlight
  const projectTabList = document.getElementsByClassName("project-tab")
  for (const projectTab of projectTabList) {
    projectTab.classList.remove("chosen-tab")
  }

  const chosenTab = document.querySelector(
    `.project-tab[data-index="${chosenIndex}"]`
  )
  chosenTab.classList.add("chosen-tab")

  checkListListener()
}

// --- Event Listeners for Project Tabs ---

const projectTabListeners = () => {
  const projectTabList = document.getElementsByClassName("project-tab")
  for (const projectTab of projectTabList) {
    projectTab.addEventListener("click", () => {
      for (const projectTab of projectTabList) {
        projectTab.classList.remove("chosen-tab")
      }

      projectTab.classList.add("chosen-tab")

      if (projectTab.id == "docket-tab") {
        console.log("docket-tab")
        previousButtonClicked()
      } else {
        projectClicked(projectTab)
      }
    })
  }
}

// -- Event Listener for previous button

const previousButtonListener = () => {
  const previous = document.querySelector(".previous")
  previous.addEventListener("click", previousButtonClicked)
}

// Event when previous button is clicked
const previousButtonClicked = () => {
  refreshProjectCards()

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

// Refresh project cards

const refreshProjectCards = () => {
  const projectCards = document.querySelector(".project-cards")
  clearChildren(projectCards)

  for (const project of myDocket.readProjectList()) {
    appendProjectCard(project)
  }

  projectCardListeners()
}

const appendProjectCard = (projectCard) => {
  const html =
    /*html*/
    `
    <div data-index="${myDocket
      .readProjectList()
      .indexOf(projectCard)}" class="project-card">
      <div class="color-bar"></div>
      <div class="project-card-text">
        <p class="project-title">${projectCard.getTitle()}</p>
        <p class="project-desc">${projectCard.getDescription()}</p>
        <div class="line-dash"></div>
        
        ${getToDoHTML(projectCard)}

        <div class="add-todo">
          <img src="./images/plus.svg" class="add-todo-icon" />
        </div>
      </div>
    </div>
    `

  projectCards.innerHTML += html
}

// Refresh project tabs

const refreshProjectTabs = () => {
  const projectTabs = document.querySelector(".sidebar")
  clearChildren(projectTabs)

  projectTabs.innerHTML =
    /*html*/
    `
    <div id="docket-tab" class="project-tab chosen-tab">
      <div class="circle-tab">
        <img class="docket-logo" src="./images/task-list.svg" />
      </div>
      Docket
    </div>
    `

  for (const project of myDocket.readProjectList()) {
    appendProjectTab(project)
  }

  projectTabListeners()
}

const appendProjectTab = (projectTab) => {
  const html =
    /*html*/
    `
    <div data-index="${myDocket
      .readProjectList()
      .indexOf(projectTab)}" class="project-tab">
      <div class="circle-tab">
        <img class="docket-logo" src="./images/project.svg" />
      </div>
      ${projectTab.getTitle()}
    </div>
    `
  const projectTabs = document.querySelector(".sidebar")
  projectTabs.innerHTML += html
}

// Get HTML pattern of the todos of a project

const getToDoHTML = (project) => {
  let returnHtml = ""

  const toDos = project.readProject()
  for (const toDo of toDos) {
    let checkMark = ""
    let checkClass = ""
    let italic = ""

    if (toDo.getChecked()) {
      checkMark = "✓"
      checkClass = "checked-circle"
      italic = "italic-text"
    }

    returnHtml +=
      /*html*/
      `
      <div class="to-do-entry">
        <div class="to-do-circle ${checkClass}">${checkMark}</div>
        <div class="to-do-text"  ${italic}>${toDo.getTitle()}</div>
      </div>
      ${getChecklistHTML(toDo)}
      `
  }

  return returnHtml
}

// Get HTML pattern of the checklist of a todo

const getChecklistHTML = (toDo) => {
  let html = ""

  // Check if checklist exists in the todo
  // (false is the default value for .getCheckList() because idk I'm dumb)
  if (toDo.getCheckList() !== false) {
    const checkList = toDo.getCheckList().readCheckListEntries()
    for (const entry of checkList) {
      let checkMark = ""
      let checkClass = ""
      let italic = ""

      if (entry[1]) {
        checkMark = "✓"
        checkClass = "checked-circle"
        italic = "italic-text"
      }

      html +=
        /*html*/
        `
        <div class="checklist-entry">
          <div id="${checkList.indexOf(entry)}" class="checklist-circle ${checkClass}">${checkMark}</div>
          <div class="checklist-text ${italic}">${entry[0]}</div>
        </div>
        `
    }
  }

  return html
}

// --- Event listener for check-circles

const checkListListener = () => {
  const checkListCircles = document.getElementsByClassName("checklist-circle")
  for (const circle of checkListCircles) {
    circle.addEventListener("click", () => {
      checkCircleClicked(circle)
    })
  }
}

const checkCircleClicked = (circle) => {
  // const checkList = toDo.getCheckList().readCheckListEntries()
  const circleIndex = circle.id
  console.log(circleIndex)
}

// --- Setting up test projects, to-dos, checklists, etc --- //

const myDocket = newProjectList()
const myProject = newProject("My Life", "It's in shambles. Send help.")

myDocket.createProject(myProject)

const anotherProj = newProject("Halp", "Send halp")
anotherProj.createToDo(newToDo({ title: "More todo for wala lang" }))
myDocket.createProject(anotherProj)

const myCheckList = newCheckList()

const toDoTest = newToDo({
  title: "Change my whole life",
  description: "Please help me",
  dueDate: "1995-05-03",
  priority: "High",
  notes: "Wasabiii",
  checkList: myCheckList,
  checked: false,
})

myProject.createToDo(toDoTest)

const moreToDo = newToDo({ title: "More todo for wala lang" })

myProject.createToDo(moreToDo)
myProject.createToDo(moreToDo)
myProject.createToDo(moreToDo)
myProject.createToDo(moreToDo)
myProject.createToDo(moreToDo)
myProject.createToDo(moreToDo)

myCheckList.addToCheckList(newCheckListEntry({ text: "Get a job" }))
myCheckList.addToCheckList(newCheckListEntry({ text: "Clean house" }))
myCheckList.addToCheckList(
  newCheckListEntry({ text: "Brush teeth", checked: true })
)

// --- Test code --- //

console.log(toDoTest.getCheckList().readCheckListEntries()[0])

// --- Main --- //

const projectCards = document.querySelector(".project-cards")

refreshProjectCards()
refreshProjectTabs()

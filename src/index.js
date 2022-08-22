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
  toggleClassQueryAll,
  hideDiv,
  hideDivQuery,
  showDivQuery,
  showDivQueryAll,
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

  initializeProjectPage(project, chosenIndex)
}

// Displays project page
const initializeProjectPage = (project, chosenIndex) => {
  // Clear all project cards then expand the clicked project card
  clearChildren(projectCards)
  appendProjectCard(project)

  // For UI, show/hide some buttons/divs
  toggleClassQuery(".project-card", "expand-project")
  hideDivQuery(".add-project")
  showDivQuery(".add-todo")
  showDivQueryAll(".add-checklist")
  changeTextContent(".docket-title", project.getTitle())
  showDivQuery(".previous")
  document.querySelector(".project-card").style.cursor = "unset"
  toggleClassQueryAll(".checklist-entry","checklist-entry-inside")
  toggleClassQueryAll(".to-do-entry","to-do-entry-inside")

  // For choosing the tab to highlight
  const projectTabList = document.getElementsByClassName("project-tab")
  for (const projectTab of projectTabList) {
    projectTab.classList.remove("chosen-tab")
  }

  const chosenTab = document.querySelector(
    `.project-tab[data-index="${chosenIndex}"]`
  )
  chosenTab.classList.add("chosen-tab")

  // Add event listener for previous button
  previousButtonListener()

  // Add event listener for checklist circles
  checkListListener(chosenIndex)

  // Add event listener for to do circles
  toDoCircleListener(chosenIndex)
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
    const toDoId = toDo.getId()
    let checkMark = ""
    let checkClass = ""
    let italic = ""
    let addChecklist = ""

    if (toDo.getChecked()) {
      checkMark = "✓"
      checkClass = "checked-circle"
      italic = "italic-text"
    }

    if (getChecklistHTML(toDo)!="") {
      addChecklist = `<div class="add-checklist">
      <img src="./images/plus.svg" class="add-checklist-icon" />
    </div>`
    }

    returnHtml +=
      /*html*/
      `
      <div class="to-do-entry">
        <div data-todoid="${toDoId}" class="to-do-circle ${checkClass}">${checkMark}</div>
        <div class="to-do-text ${italic}">${toDo.getTitle()}</div>
      </div>
      ${getChecklistHTML(toDo)}

      ${addChecklist}
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
      const toDoId = toDo.getId()
      const checkId = checkList.indexOf(entry)

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
          <div data-todoid="${toDoId}" data-checkid="${checkId}" class="checklist-circle ${checkClass}">${checkMark}</div>
          <div class="checklist-text ${italic}">${entry[0]}</div>
        </div>
        `
    }
  }

  return html
}

// --- Event listener for check-circles

const checkListListener = (chosenIndex) => {
  const checkListCircles = document.getElementsByClassName("checklist-circle")
  for (const circle of checkListCircles) {
    circle.addEventListener("click", () => {
      checkCircleClicked(circle, chosenIndex)
    })
  }
}

const checkCircleClicked = (circle, chosenIndex) => {
  // const checkList = toDo.getCheckList().readCheckListEntries()
  const circleIndex = circle.dataset.checkid
  const toDoId = circle.dataset.todoid
  console.log("circle index: ", circleIndex, ",  to-do id: ", toDoId)
  const toDo = myDocket.readProjectList()[chosenIndex].readProject()[toDoId]
  const toToggle = toDo.getCheckList().readCheckList()[circleIndex]
  toToggle.toggleChecked()
  console.log(toToggle.getChecked())

  // circle.classList.toggle("checked-circle")
  const chosenProject = myDocket.readProjectList()[chosenIndex]
  initializeProjectPage(chosenProject, chosenIndex)
}

// --- Event listener for to-do-circles

const toDoCircleListener = (chosenIndex) => {
  const toDoCircles = document.getElementsByClassName("to-do-circle")
  for (const circle of toDoCircles) {
    circle.addEventListener("click", () => {
      toDoCircleClicked(circle, chosenIndex)
    })
  }
}

const toDoCircleClicked = (circle, chosenIndex) => {
  const toDoId = circle.dataset.todoid
  console.log("to-do id: ", toDoId)
  const toDo = myDocket.readProjectList()[chosenIndex].readProject()[toDoId]
  // [toDoId]
  // const toToggle = toDo.gettoDo().readtoDo()[circleIndex]
  toDo.toggleChecked()
  console.log(toDo.getChecked())

  const chosenProject = myDocket.readProjectList()[chosenIndex]
  initializeProjectPage(chosenProject, chosenIndex)
}

// --- Setting up test projects, to-dos, cheklists, etc --- //

const myDocket = newProjectList()
const myProject = newProject("My Life", "It's in shambles. Send help.")

myDocket.createProject(myProject)

const anotherProj = newProject("Halp", "Send halp")
anotherProj.createToDo(newToDo({ title: "More todo for wala lang", id: 0 }))
myDocket.createProject(anotherProj)

const myCheckList = newCheckList()

const toDoTest = newToDo({
  id: 0,
  title: "Change my whole life",
  description: "Please help me",
  dueDate: "1995-05-03",
  priority: "High",
  notes: "Wasabiii",
  checkList: myCheckList,
  checked: false,
})

myProject.createToDo(toDoTest)

const moreToDo = newToDo({ title: "More todo for wala lang", id: 1 })

myProject.createToDo(newToDo({ title: "More todo for wala lang", id: 1 }))
myProject.createToDo(newToDo({ title: "More todo for wala lang", id: 2 }))
myProject.createToDo(newToDo({ title: "More todo for wala lang", id: 3 }))
myProject.createToDo(newToDo({ title: "More todo for wala lang", id: 4 }))
myProject.createToDo(newToDo({ title: "More todo for wala lang", id: 5 }))
myProject.createToDo(newToDo({ title: "More todo for wala lang", id: 6 }))

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

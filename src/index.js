import style from "./style.css"
import { deleteItem, returnExisting } from "./array.js"

import addToDoIconSvg from "./images/plus.svg"

import newProjectList from "./newProjectList.js"
import newProject from "./newProject.js"
import newToDo from "./newToDo.js"
import newCheckList from "./newCheckList.js"
import newCheckListEntry from "./newCheckListEntry.js"

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
  return toDo
    .getCheckList()
    .readCheckList()
    .map((item) => {
      return [item.getText(), item.getChecked()]
    })
}

// --- Div functions --- //

// Toggle class of given div
const toggleClassDiv = (div, classToToggle) => {
  div.classList.toggle(classToToggle)
}

// Toggle class with query selector
const toggleClassQuery = (querySelect, classToToggle) => {
  const div = document.querySelector(querySelect)
  div.classList.toggle(classToToggle)
}

const hideDivQuery = (queryOfDiv) => {
  const div = document.querySelector(queryOfDiv)
  div.style.display = "none"
}

const hideDiv = (div) => {
  div.style.display = "none"
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

const projectClicked = (chosenProject) => {
  console.log(chosenProject.dataset.index)
  projectCards.innerHTML = ""
  appendProjectCard(myDocket.readProjectList()[chosenProject.dataset.index])
  toggleClassQuery(".project-card", "expand-project")
  hideDivQuery(".add-project")

}

const refreshProjectCards = (projectCards) => {
  projectCards.innerHTML = ""

  for (const project of myDocket.readProjectList()) {
    
    appendProjectCard(project)
  }
}
// ${myDocket.readProjectList().indexOf(projectCard)}
const appendProjectCard = (projectCard) => {
  const html =
    /*html*/
    `
    <div data-index="${myDocket.readProjectList().indexOf(projectCard)}" class="project-card">
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

const getToDoHTML = (project) => {
  let returnHtml = ""

  const toDos = listToDos(project)
  for (const toDo of toDos) {
    returnHtml +=
      /*html*/
      `
      <div class="to-do-entry">
        <div class="to-do-circle"></div>
        <div class="to-do-text">${toDo[0]}</div>
      </div>
      `
  }

  return returnHtml
}

// Add-to-do circle
const addToDoIcon = document.createElement("img")
addToDoIcon.classList.add("add-todo-icon")
addToDoIcon.src = addToDoIconSvg
const addToDo = document.createElement("div")
addToDo.classList.add("add-todo")

addToDo.appendChild(addToDoIcon)

// --- Setting up test projects, to-dos, checklists, etc --- //

const myDocket = newProjectList()
const myProject = newProject(
  "Title: My Life (Project)",
  "Description: It's in shambles. Send help."
)

myDocket.createProject(myProject)

const anotherProj = newProject("Halp (Project)", "Send halp")
anotherProj.createToDo(newToDo({title: "More todo for wala lang"}))
myDocket.createProject(anotherProj)

const myCheckList = newCheckList()

const toDoTest = newToDo({
  title: "Change my whole life (To-Do)",
  description: "Please help me",
  dueDate: "1995-05-03",
  priority: "High",
  notes: "Wasabiii",
  checkList: myCheckList,
  checked: false,
})

myProject.createToDo(toDoTest)

myProject.createToDo(newToDo({title: "More todo for wala lang"}))
myProject.createToDo(newToDo({title: "More todo for wala lang"}))
myProject.createToDo(newToDo({title: "More todo for wala lang"}))
myProject.createToDo(newToDo({title: "More todo for wala lang"}))
myProject.createToDo(newToDo({title: "More todo for wala lang"}))
myProject.createToDo(newToDo({title: "More todo for wala lang"}))

myCheckList.addToCheckList(newCheckListEntry({ text: "Get a job" }))
myCheckList.addToCheckList(newCheckListEntry({ text: "Clean house" }))
myCheckList.addToCheckList(
  newCheckListEntry({ text: "Brush teeth", checked: true })
)

// --- Test code --- //

// console.log(listAllProjects(myDocket))
// console.log(listToDos(myProject))
// console.log(listCheckList(toDoTest))
// console.log(listToDos(anotherProj))

// --- Main --- //

const projectCards = document.querySelector(".project-cards")

refreshProjectCards(projectCards)
projectCardListeners()

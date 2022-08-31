import style from "./style.css"
import modal from "./modal.css"
import animations from "./animations.css"

import newProjectList from "./newProjectList.js"
import newProject from "./newProject.js"
import newToDo from "./newToDo.js"
import newCheckList from "./newCheckList.js"
import newCheckListEntry from "./newCheckListEntry.js"

import { refreshProjectCards } from "./projectCards.js"

import { refreshProjectTabs } from "./projectTabs.js"

// Order of objects from biggest to smallest
// Project List > Project > To-Do > Checklist > Checklist Entry

// --- Setting up test projects, to-dos, checklists, etc --- //

const myDocket = newProjectList()
const myProject = newProject("My Life", "It's in shambles. Send help.")

myDocket.createProject(myProject)

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

myProject.createToDo(newToDo({ title: "Clean bathroom" }))
myProject.createToDo(newToDo({ title: "Take a bath" }))
myProject.createToDo(newToDo({ title: "Drink vitamins" }))
myProject.createToDo(newToDo({ title: "Vacuum" }))
myProject.createToDo(newToDo({ title: "Seek cure for mental illness" }))
myProject.createToDo(newToDo({ title: "Do laundry" }))

myCheckList.addToCheckList(newCheckListEntry({ text: "Get a job" }))
myCheckList.addToCheckList(newCheckListEntry({ text: "Clean house" }))
myCheckList.addToCheckList(
  newCheckListEntry({ text: "Brush teeth", checked: true })
)

const myProjectForThisApp = newProject(
  "Docket Fix-ables",
  "Things that can be improved / fixed in this app lmao"
)
myDocket.createProject(myProjectForThisApp)
myProjectForThisApp.createToDo(
  newToDo({
    title:
      "Project title and project description cut off in the docket page when they are too long",
  })
)
myProjectForThisApp.createToDo(
  newToDo({ title: "^ Same with to-dos and checklists (they cut off weird)" })
)
myProjectForThisApp.createToDo(
  newToDo({
    title:
      "Adding of checklist is not super intuitive (it works though)",
  })
)
myProjectForThisApp.createToDo(
  newToDo({
    title:
      "Maybe make the to-do icons appear when the to-do is hovered",
  })
)
myProjectForThisApp.createToDo(
  newToDo({
    title:
      "When adding a to-do, make the priority be a choice of radio buttons",
  })
)
myProjectForThisApp.createToDo(
  newToDo({
    title:
      "Make priority and due date visible in the project page (don't know in what form yet)",
  })
)
myProjectForThisApp.createToDo(newToDo({ title: "Use date-fns for due dates" }))
myProjectForThisApp.createToDo(
  newToDo({ title: "Save data in local computer" })
)
myProjectForThisApp.createToDo(newToDo({ title: "Improve layout of modals" }))
myProjectForThisApp.createToDo(
  newToDo({
    title:
      "When clicking / viewing to-dos, the space where you can click is only on the text, sometimes it doesn't work",
  })
)

const anotherProj = newProject("Halp", "Send halp")
anotherProj.createToDo(newToDo({ title: "More todo for wala lang" }))
myDocket.createProject(anotherProj)
// --- Test code --- //

// --- Main --- //

refreshProjectCards(myDocket)
refreshProjectTabs(myDocket)

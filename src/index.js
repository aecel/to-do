import style from "./style.css"
import modal from "./modal.css"

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

const moreToDo = newToDo({ title: "Do laundry" })

myProject.createToDo(newToDo({ title: "Clean bathroom" }))
myProject.createToDo(newToDo({ title: "Take a bath" }))
myProject.createToDo(newToDo({ title: "Drink vitamins" }))
myProject.createToDo(newToDo({ title: "Vacuum" }))
myProject.createToDo(newToDo({ title: "Seek cure for mental illness" }))
myProject.createToDo(newToDo({ title: "Saing" }))

myCheckList.addToCheckList(newCheckListEntry({ text: "Get a job" }))
myCheckList.addToCheckList(newCheckListEntry({ text: "Clean house" }))
myCheckList.addToCheckList(
  newCheckListEntry({ text: "Brush teeth", checked: true })
)

// --- Test code --- //

// --- Main --- //

refreshProjectCards(myDocket)
refreshProjectTabs(myDocket)

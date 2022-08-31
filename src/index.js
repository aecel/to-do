import style from "./style.css"
import modal from "./modal.css"
import animations from "./animations.css"

import { refreshProjectCards } from "./projectCards.js"

import { refreshProjectTabs } from "./projectTabs.js"

import {
  storeToLocalStorage,
  getFromLocalStorage,
  storeProjectListData,
  getProjectListData,
} from "./storage.js"
import { createTestDocket } from "./testDocket"

// Order of objects from biggest to smallest
// Project List > Project > To-Do > Checklist > Checklist Entry

// --- Setting up test projects, to-dos, checklists, etc --- //

let myDocket = getProjectListData()
// --- Test code --- //

// --- Main --- //

refreshProjectCards(myDocket)
refreshProjectTabs(myDocket)

// Event listener for saving data
const saveData = document.querySelector(".save-data")
saveData.addEventListener("click", () => {
  console.log("my docket", myDocket && myDocket.readProjectList())
  saveDataClicked(myDocket)
})

// Event listener for loading data
const loadData = document.querySelector(".load-data")
loadData.addEventListener("click", () => {
  myDocket = loadDataClicked()
  console.log("my docket", myDocket && myDocket.readProjectList())
})

const saveDataClicked = (myDocket) => {
  storeProjectListData(myDocket)
}

const loadDataClicked = () => {
  if (
    getFromLocalStorage("projectData") &&
    getFromLocalStorage("toDoData") &&
    getFromLocalStorage("checkListData")
  ) {
    const newDocket = getProjectListData()
    console.log("Loaded projectlist", newDocket.readProjectList())
    refreshProjectCards(newDocket)
    refreshProjectTabs(newDocket)
    return newDocket
  }
}


// --- Test code again --- //

// Clear local storage
// window.localStorage.clear()

// storeProjectListData(myDocket)
// myDocket = {}
// const myNewDocket = getProjectListData()

// refreshProjectCards(myNewDocket)
// refreshProjectTabs(myNewDocket)
// getProjectListData()

import newProjectList from "./newProjectList.js"
import newProject from "./newProject.js"
import newToDo from "./newToDo.js"
import newCheckList from "./newCheckList.js"
import newCheckListEntry from "./newCheckListEntry.js"
import storageAvailable from "./storageAvailable.js"
import { createTestDocket } from "./testDocket.js"

const storeToLocalStorage = (key, projectList) => {
  if (storageAvailable("localStorage")) {
    // Yippee! We can use localStorage awesomeness
    const projectListStringified = JSON.stringify(projectList)
    window.localStorage.setItem(key, projectListStringified)
  } else {
    // Too bad, no localStorage for us
  }
}

const getFromLocalStorage = (key) => {
  if (storageAvailable("localStorage")) {
    // Yippee! We can use localStorage awesomeness
    const projectListStringified = window.localStorage.getItem(key)
    const parsedProjectList = JSON.parse(projectListStringified)

    return parsedProjectList
  } else {
    // Too bad, no localStorage for us
  }
}

// Storing data for local storage
const storeProjectListData = (myDocket) => {
  const projectData = myDocket.readProjectList().map((project) => {
    return project.getProjectProperties()
  })

  const toDoData = myDocket.readProjectList().map((project) => {
    return project.readProject().map((toDo) => {
      return toDo.getToDoProperties()
    })
  })

  const checkListData = myDocket.readProjectList().map((project) => {
    return project.readProject().map((toDo) => {
      return toDo
        .getCheckList()
        .getEntries()
        .map((entry) => {
          return entry.getEntryProperties()
        })
    })
  })

  storeToLocalStorage("projectData", projectData)
  storeToLocalStorage("toDoData", toDoData)
  storeToLocalStorage("checkListData", checkListData)
  console.log("Saved to local storage")
}

// Retrieving data from local storage
const getProjectListData = () => {
  const retrievedProjectData = getFromLocalStorage("projectData")
  const retrievedToDoData = getFromLocalStorage("toDoData")
  const retrievedCheckListData = getFromLocalStorage("checkListData")

  if (retrievedProjectData && retrievedToDoData && retrievedCheckListData) {
    console.log("Local storage data exists")

    const myDocket = newProjectList()
    for (const project of retrievedProjectData) {
      const projectObj = newProject(project)
      myDocket.createProject(projectObj)
    }

    let projIndex = 0
    let testProjIndex = 0
    for (const toDos of retrievedToDoData) {
      let toDoIndex = 0
      for (const toDo of toDos) {
        const testChecklist = newCheckList()
        const toDoObj = newToDo(toDo)

        const project = myDocket.getProjectById(testProjIndex)
        project.createToDo(toDoObj)

        toDoObj.updateToDo({ newCheckList: testChecklist })
        const checkListEntries = retrievedCheckListData[projIndex][toDoIndex]
        for (const entry of checkListEntries) {
          const entryObj = newCheckListEntry(entry)
          const toDo = myDocket
            .getProjectById(testProjIndex)
            .getToDoById(toDoIndex)
          toDo.getCheckList().addToCheckList(entryObj)
        }
        toDoIndex++
      }
      projIndex++
      testProjIndex++
    }

    return myDocket
  } else {
    console.log("Local storage data does not exist")
    return createTestDocket()
  }
}

export {
  getFromLocalStorage,
  storeToLocalStorage,
  storeProjectListData,
  getProjectListData,
}

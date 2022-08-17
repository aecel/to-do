import style from "./style.css"
import { readArray, deleteItem, returnExisting } from "./array.js"
import newProjectList from "./newProjectList.js"
import newProject from "./newProject.js"
import newToDo from "./newToDo.js"
import newCheckList from "./newCheckList.js"
import newCheckListEntry from "./newCheckListEntry.js"

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

const myToDoApp = newProjectList()
const myProject = newProject(
  "Title: My Life (Project)",
  "Description: It's in shambles. Send help."
)

myToDoApp.createProject(myProject)

const anotherProj = newProject("Halp (Project)", "Send halp")
myToDoApp.createProject(anotherProj)

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
myCheckList.addToCheckList(newCheckListEntry({ text: "Get a job" }))
myCheckList.addToCheckList(newCheckListEntry({ text: "Clean house" }))
myCheckList.addToCheckList(
  newCheckListEntry({ text: "Brush teeth", checked: true })
)

console.log(listAllProjects(myToDoApp))
console.log(listToDos(myProject))
console.log(listCheckList(toDoTest))
console.log(listToDos(anotherProj))

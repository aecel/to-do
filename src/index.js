import style from "./style.css"
import { readArray, deleteItem, returnExisting } from "./array.js"
import newProjectList from "./newProjectList.js"
import newProject from "./newProject.js"
import newToDo from "./newToDo.js"
import newCheckList from "./newCheckList.js"
import newCheckListEntry from "./newCheckListEntry.js"

const myToDoApp = newProjectList()
const myProject = newProject(
  "Title: My Life",
  "Description: It's in shambles. Send help."
)

myToDoApp.createProject(myProject)

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
myCheckList.addToCheckList(newCheckListEntry({ text: "Get a job" }))
myCheckList.addToCheckList(newCheckListEntry({ text: "Clean house" }))
myCheckList.addToCheckList(
  newCheckListEntry({ text: "Brush teeth", checked: true })
)

console.log(
  toDoTest
    .getCheckList()
    .readCheckList()
    .map((text) => {
      return [text.getText(), text.getChecked()]
    })
)

console.log(
  myToDoApp.readProjectList().map((thing) => {
    return thing.readProject().map((thing) => {
      return thing.getTitle()
    })
  })
)

// const myArray = [
//   ["hello", "hi"],
//   ["hi", "how", "are", { 1: "one", 2: "two" }],
// ]

// console.log(
//   myArray.map((item) => {
//     return item
//   })
// )

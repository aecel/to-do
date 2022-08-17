import { readArray, deleteItem, returnExisting } from "./array.js"

const newToDo = ({
  title = "",
  description = "",
  dueDate = "",
  priority = "Low",
  notes = "",
  checkList = [],
  checked = false,
}) => {
  const getTitle = () => returnExisting(title)
  const getDescription = () => returnExisting(description)
  const getDueDate = () => returnExisting(dueDate)
  const getPriority = () => returnExisting(priority)
  const getNotes = () => returnExisting(notes)
  const getCheckList = () => returnExisting(checkList)
  const getChecked = () => returnExisting(checked)

  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getNotes,
    getCheckList,
    getChecked,
  }
}

export default newToDo

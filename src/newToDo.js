import { deleteItem, returnExisting } from "./array.js"

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
  const getPriority = () => returnExisting(priority, "Low")
  const getNotes = () => returnExisting(notes, "")
  const getCheckList = () => returnExisting(checkList, [])
  const getChecked = () => returnExisting(checked, false)

  const toggleChecked = () => {
    checked = !checked
  }

  const updateToDo = ({
    newTitle,
    newDescription,
    newDueDate,
    newPriority,
    newNotes,
    newCheckList,
    newChecked,
  }) => {
    if (newTitle) title = newTitle
    if (newDescription) description = newDescription
    if (newDueDate) dueDate = newDueDate
    if (newPriority) priority = newPriority
    if (newNotes) notes = newNotes
    if (newCheckList) checkList = newCheckList
    if (newChecked !== null && newChecked !== undefined) checked = newChecked
  }

  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getNotes,
    getCheckList,
    getChecked,
    toggleChecked,
    updateToDo,
  }
}

export default newToDo

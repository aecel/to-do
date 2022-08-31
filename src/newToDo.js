import { deleteItem, returnExisting } from "./array.js"

const newToDo = ({
  title = "",
  description = "",
  dueDate = "",
  priority = "Low",
  notes = "",
  checkList = false,
  checked = false,
}) => {
  let id
  let project

  const getId = () => id
  const getTitle = () => returnExisting(title)
  const getDescription = () => returnExisting(description)
  const getDueDate = () => returnExisting(dueDate)
  const getPriority = () => returnExisting(priority, "Low")
  const getNotes = () => returnExisting(notes, "")
  const getCheckList = () => returnExisting(checkList, false)
  const getChecked = () => returnExisting(checked, false)
  const getToDoProperties = () => {
    return {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      notes: notes,
      checkList: checkList,
      checked: checked,
    }
  }

  const setProject = (value) => {
    project = value
  }

  const getProject = () => project

  const setId = (value) => {
    id = value
  }
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
    getId,
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getNotes,
    getCheckList,
    getChecked,
    toggleChecked,
    updateToDo,
    setId,
    setProject,
    getProject,
    getToDoProperties,
  }
}

export default newToDo

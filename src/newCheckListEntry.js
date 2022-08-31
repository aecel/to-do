import { returnExisting } from "./array.js"

const newCheckListEntry = ({ text = "", checked = false }) => {
  let id
  let checklist

  const getText = () => returnExisting(text)
  const getChecked = () => returnExisting(checked, false)

  const getEntry = () => [text, checked]

  const setId = (value) => {
    id = value
  }
  const getId = () => id

  const setChecklist = (value) => {
    checklist = value
  }

  const getCheckList = () => checklist

  const toggleChecked = () => {
    checked = !checked
  }

  const updateEntry = ({ newText, newChecked }) => {
    if (newText) text = newText
    if (newChecked !== null && newChecked !== undefined) checked = newChecked
  }

  const getEntryProperties = () => {
    return { text: text, checked: checked }
  }
  return {
    setId,
    getId,
    setChecklist,
    getCheckList,
    getText,
    getChecked,
    getEntry,
    toggleChecked,
    updateEntry,
    getEntryProperties,
  }
}

export default newCheckListEntry

import { returnExisting } from "./array.js"

const newCheckListEntry = ({ text = "", checked = false }) => {
  const getText = () => returnExisting(text)
  const getChecked = () => returnExisting(checked)

  const toggleChecked = () => {
    checked = !checked
  }

  const editEntry = ({ newText, newChecked }) => {
    if (newText) text = newText
    if (newChecked !== null && newChecked !== undefined) checked = newChecked
  }

  return {
    getText,
    getChecked,
    toggleChecked,
    editEntry,
  }
}

export default newCheckListEntry

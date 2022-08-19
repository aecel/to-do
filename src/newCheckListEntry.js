import { returnExisting } from "./array.js"

const newCheckListEntry = ({ text = "", checked = false }) => {
  const getText = () => returnExisting(text)
  const getChecked = () => returnExisting(checked, false)

  const toggleChecked = () => {
    checked = !checked
  }

  const updateEntry = ({ newText, newChecked }) => {
    if (newText) text = newText
    if (newChecked !== null && newChecked !== undefined) checked = newChecked
  }

  return {
    getText,
    getChecked,
    toggleChecked,
    updateEntry,
  }
}

export default newCheckListEntry

import { returnExisting } from "./array.js"

const newCheckListEntry = ({ text = "", checked = false }) => {
  const getText = () => returnExisting(text)
  const getChecked = () => returnExisting(checked, false)

  const getEntry = () => [text, checked]

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
    getEntry,
    toggleChecked,
    updateEntry,
  }
}

export default newCheckListEntry

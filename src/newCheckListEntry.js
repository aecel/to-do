import { returnExisting } from "./array.js"

const newCheckListEntry = ({ text = "", checked = false }) => {
  const getText = () => returnExisting(text)
  const getChecked = () => returnExisting(checked)

  return {
    getText,
    getChecked,
  }
}

export default newCheckListEntry

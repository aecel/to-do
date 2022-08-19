import { deleteItem, returnExisting } from "./array.js"

const newCheckList = () => {
  const checkList = []

  const addToCheckList = (item) => {
    checkList.push(item)
  }

  const readCheckList = () => {
    return checkList
  }

  const deleteFromCheckList = (entry) => {
    deleteItem(checkList, entry)
  }

  return {
    addToCheckList,
    readCheckList,
    deleteFromCheckList,
  }
}

export default newCheckList

import { deleteItem, returnExisting } from "./array.js"
import newCheckListEntry from "./newCheckListEntry.js"

const newCheckList = () => {
  const checkList = []

  const addToCheckList = (item) => {
    checkList.push(item)
  }

  const readCheckList = () => {
    return checkList
  }

  const readCheckListEntries = () => {
    return checkList.map((item)=>{
       return item.getEntry() 
    })
  }

  const deleteFromCheckList = (entry) => {
    deleteItem(checkList, entry)
  }

  return {
    addToCheckList,
    readCheckList,
    readCheckListEntries,
    deleteFromCheckList,
  }
}

export default newCheckList

import { deleteItem, returnExisting } from "./array.js"
import newCheckListEntry from "./newCheckListEntry.js"

const newCheckList = () => {
  const checkList = []

  let nextChecklistId = 0

  const myself = {}

  const addToCheckList = (item) => {
    checkList.push(item)
    item.setId(nextChecklistId)
    nextChecklistId++
    item.setChecklist(myself)
  }

  const getChecklistById = (checklistid) => {
    for (const checklistEntry of checkList) {
      if (checklistEntry.getId() == checklistid) return checklistEntry
    }
    return null
  }

  const readCheckList = () => {
    return checkList
  }

  const readCheckListEntries = () => {
    return checkList.map((item) => {
      return item.getEntry()
    })
  }

  const deleteFromCheckList = (entry) => {
    deleteItem(checkList, entry)
  }

  Object.assign(myself, {
    addToCheckList,
    getChecklistById,
    readCheckList,
    readCheckListEntries,
    deleteFromCheckList,
  })

  return myself
}

export default newCheckList

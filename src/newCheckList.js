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

  const readCheckList = () => checkList

  const readCheckListEntries = () => checkList.map((item) => item.getEntry())

  const getEntries = () => checkList.map((item) => item)
  const deleteFromCheckList = (entry) => {
    deleteItem(checkList, entry)
  }

  Object.assign(myself, {
    addToCheckList,
    getChecklistById,
    readCheckList,
    readCheckListEntries,
    deleteFromCheckList,
    getEntries,
  })

  return myself
}

export default newCheckList

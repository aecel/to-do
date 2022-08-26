import modalFunctions from "./modal.js"
import { initializeProjectPage } from "./projectCards.js"
import { removeAllEventListenersAndReturnClone } from "./util.js"

// Add modal listeners for adding to-dos and adding checklists

const addModalListeners = (project) => {
  modalFunctions(
    ".add-todo-modal",
    ".add-todo",
    ".close-add-todo-modal",
    (modal, dataset) => addToDoHtml(modal, dataset, project)
  )

  modalFunctions(
    ".add-checklist-modal",
    ".add-checklist",
    ".close-add-checklist-modal",
    (modal, dataset) => addChecklistHtml(modal, dataset, project)
  )

  modalFunctions(
    ".edit-todo-modal",
    ".edit-todo",
    ".close-edit-todo-modal",
    (modal, dataset) => editToDoHtml(modal, dataset, project)
  )

  modalFunctions(
    ".delete-todo-modal",
    ".delete-todo",
    ".close-delete-todo-modal",
    (modal, dataset) => deleteToDoHtml(modal, dataset, project)
  )

  modalFunctions(
    ".delete-checklist-modal",
    ".delete-checklist",
    ".close-delete-checklist-modal",
    (modal, dataset) => deleteChecklistHtml(modal, dataset, project)
  )
}

const addToDoHtml = (modal, dataset, project) => {
  console.log("Hello add todo modal is open mwamwa")
  const modalContent = modal.getElementsByClassName("modal-text")[0]
  modalContent.textContent = `Hello I am add todo modal`
}

const addChecklistHtml = (modal, dataset, project) => {
  console.log("Hello add todo modal is open mwamwa")
  const modalContent = modal.getElementsByClassName("modal-text")[0]
  modalContent.textContent = `Hello I am add checklist modal`
}

const editToDoHtml = (modal, dataset, project) => {
  console.log("Hello edit modal is open mwamwa")
  const modalContent = modal.getElementsByClassName("modal-text")[0]
  modalContent.textContent = `I mishu briney Dataset: ${dataset.todoid}`
}

const deleteToDoHtml = (modal, dataset, project) => {
  const modalContent = modal.getElementsByClassName("modal-text")[0]

  const yesButton = modal.getElementsByClassName("yes-button")[0]

  const onYesButtonClicked = () => {
    const toDo = project.getToDoById(dataset.todoid)

    // Delete in the UI
    const toDoContainers = document.getElementsByClassName("to-do-container")
    for (const toDoContainer of toDoContainers) {
      if (toDoContainer.dataset.todoid == toDo.getId()) {
        toDoContainer.parentElement.removeChild(toDoContainer)
        break
      }
    }

    project.deleteToDo(toDo)

    // Close modal
    modal.style.display = "none"

    // Remove Event Listener
    yesButton.removeEventListener("click", onYesButtonClicked)
  }

  yesButton.addEventListener("click", onYesButtonClicked)

  const noButton = modal.getElementsByClassName("no-button")[0]

  const onNoButtonClicked = () => {
    // Close modal
    modal.style.display = "none"

    noButton.removeEventListener("click", onNoButtonClicked)
  }

  noButton.addEventListener("click", onNoButtonClicked)

  //   modalContent.textContent = `I mishu briney Dataset: ${dataset.todoid}`
}

const deleteChecklistHtml = (modal, dataset, project) => {
  const modalContent = modal.getElementsByClassName("modal-text")[0]

  const yesButton = modal.getElementsByClassName("yes-button")[0]

  const onYesButtonClicked = () => {
    const toDo = project.getToDoById(dataset.todoid)

    const checklist = toDo.getCheckList()
    const checklistEntry = checklist.getChecklistById(dataset.checkid)
    // console.log("Checklist: ", checklist)
    // console.log("Checklist Entry: ", checklistEntry)
    // console.log("Checklist Id: ", checklistEntry.getId())

    checklist.deleteFromCheckList(checklistEntry)

    // Delete in the UI
    const checklistItems = document.getElementsByClassName("checklist-entry")
    for (const checklistItem of checklistItems) {
      if (checklistItem.dataset.checkid == checklistEntry.getId()) {
        checklistItem.parentElement.removeChild(checklistItem)
        break
      }
    }

    // Close modal
    modal.style.display = "none"

    yesButton.removeEventListener("click", onYesButtonClicked)
  }

  yesButton.addEventListener("click", onYesButtonClicked)

  const noButton = modal.getElementsByClassName("no-button")[0]

  const onNoButtonClicked = () => {
    // Close modal
    modal.style.display = "none"

    noButton.removeEventListener("click", onNoButtonClicked)
  }

  noButton.addEventListener("click", onNoButtonClicked)
}

export default addModalListeners

import modalFunctions from "./modal.js"
import newCheckList from "./newCheckList.js"
import newCheckListEntry from "./newCheckListEntry.js"
import { initializeProjectPage } from "./projectCards.js"
import newToDo from "./newToDo.js"

const closeForm = (modal) => {
  modal.style.display = "none"
}

const addToDoHtml = (modal, dataset, project) => {
  const todoForm = document.getElementById("add-todo-form")

  const submitForm = (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)

    const toDoTitle = formData.get("add-todo-title")
    const toDoDescription = formData.get("add-todo-description")
    const toDoDueDate = formData.get("add-todo-duedate")
    const toDoPriority = formData.get("add-todo-priority-radio")
    const toDoNotes = formData.get("add-todo-notes")

    if (toDoTitle != "") {
      const toDo = newToDo({
        title: toDoTitle,
        description: toDoDescription,
        dueDate: toDoDueDate,
        priority: toDoPriority,
        notes: toDoNotes,
      })

      project.createToDo(toDo)
    }

    initializeProjectPage(project)
    form.reset()

    closeForm(modal)

    todoForm.removeEventListener("submit", submitForm)
  }

  todoForm.addEventListener("submit", submitForm)
}

const addChecklistHtml = (modal, dataset, project) => {
  const toDo = project.getToDoById(dataset.todoid)
  let checkList = toDo.getCheckList()
  if (checkList == false) {
    checkList = newCheckList()
  }

  const checklistForm = document.getElementById("add-checklist-form")

  const submitForm = (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)

    const checklistEntryText = formData.get("add-checklist-entry")

    if (checklistEntryText != "") {
      const Entry = { text: `${checklistEntryText}`, checked: false }
      const newEntry = newCheckListEntry(Entry)
      checkList.addToCheckList(newEntry)
    }

    initializeProjectPage(project)
    form.reset()

    closeForm(modal)

    checklistForm.removeEventListener("submit", submitForm)
  }

  checklistForm.addEventListener("submit", submitForm)
}

const viewToDoHtml = (modal, dataset, project) => {
  const modalContent = modal.getElementsByClassName("modal-text")[0]

  const toDo = project.getToDoById(dataset.todoid)

  const title = modalContent.getElementsByClassName("title")[0]
  const description = modalContent.getElementsByClassName("description")[0]
  const dueDate = modalContent.getElementsByClassName("due-date")[0]
  const priority = modalContent.getElementsByClassName("priority")[0]
  const notes = modalContent.getElementsByClassName("notes")[0]

  title.textContent = `Title: ${toDo.getTitle()}`
  description.textContent = `Description: ${toDo.getDescription()}`
  dueDate.textContent = `Due Date: ${toDo.getDueDate()}`
  priority.textContent = `Priority: ${toDo.getPriority()}`
  notes.textContent = `Notes: ${toDo.getNotes()}`
}

const editToDoHtml = (modal, dataset, project) => {
  const toDo = project.getToDoById(dataset.todoid)

  const todoForm = document.getElementById("edit-todo-form")

  const inputTitle = document.getElementById("edit-todo-title")
  const inputDescription = document.getElementById("edit-todo-description")
  const inputDueDate = document.getElementById("edit-todo-duedate")
  const inputPriorities = document.getElementsByName("edit-todo-priority-radio")
  const inputNotes = document.getElementById("edit-todo-notes")

  inputTitle.value = `${toDo.getTitle()}`
  inputDescription.value = `${toDo.getDescription()}`
  inputDueDate.value = `${toDo.getDueDate()}`

  for (const input of inputPriorities) {
    if (input.value == toDo.getPriority()) {
      input.checked = true
    }
  }

  inputNotes.value = `${toDo.getNotes()}`

  const submitForm = (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)

    const toDoTitle = formData.get("edit-todo-title")
    const toDoDescription = formData.get("edit-todo-description")
    const toDoDueDate = formData.get("edit-todo-duedate")
    const toDoPriority = formData.get("edit-todo-priority-radio")
    const toDoNotes = formData.get("edit-todo-notes")

    toDo.updateToDo({
      newTitle: toDoTitle,
      newDescription: toDoDescription,
      newDueDate: toDoDueDate,
      newPriority: toDoPriority,
      newNotes: toDoNotes,
    })

    initializeProjectPage(project)
    form.reset()

    closeForm(modal)

    todoForm.removeEventListener("submit", submitForm)
  }

  todoForm.addEventListener("submit", submitForm)
}

const editChecklistHtml = (modal, dataset, project) => {
  const toDo = project.getToDoById(dataset.todoid)
  const checkList = toDo.getCheckList()
  const checkListEntry = checkList.getChecklistById(dataset.checkid)

  const checklistForm = document.getElementById("edit-checklist-form")
  const inputField = document.getElementById("edit-checklist-entry")
  const placeholderText = `${checkListEntry.getText()}`

  // Change this to inputField.placeholder if you want the
  // old text to be visible, but not "editable"
  inputField.value = placeholderText

  const submitForm = (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)

    const checklistEntryText = formData.get("edit-checklist-entry")

    if (checklistEntryText != "") {
      checkListEntry.updateEntry({ newText: `${checklistEntryText}` })
    }

    initializeProjectPage(project)
    form.reset()

    closeForm(modal)

    checklistForm.removeEventListener("submit", submitForm)
  }

  checklistForm.addEventListener("submit", submitForm)
}

const deleteToDoHtml = (modal, dataset, project) => {
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

    closeForm(modal)

    // Remove Event Listener
    yesButton.removeEventListener("click", onYesButtonClicked)
  }

  yesButton.addEventListener("click", onYesButtonClicked)

  const noButton = modal.getElementsByClassName("no-button")[0]

  const onNoButtonClicked = () => {
    closeForm(modal)

    noButton.removeEventListener("click", onNoButtonClicked)
  }

  noButton.addEventListener("click", onNoButtonClicked)
}

const deleteChecklistHtml = (modal, dataset, project) => {
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
    // This is wrong lol, need to check for which project it's from

    // const checklistItems = document.getElementsByClassName("checklist-entry")
    // for (const checklistItem of checklistItems) {
    //   if (checklistItem.dataset.checkid == checklistEntry.getId()) {
    //     checklistItem.parentElement.removeChild(checklistItem)
    //     break
    //   }
    // }

    initializeProjectPage(project)

    closeForm(modal)

    yesButton.removeEventListener("click", onYesButtonClicked)
  }

  yesButton.addEventListener("click", onYesButtonClicked)

  const noButton = modal.getElementsByClassName("no-button")[0]

  const onNoButtonClicked = () => {
    closeForm(modal)

    noButton.removeEventListener("click", onNoButtonClicked)
  }

  noButton.addEventListener("click", onNoButtonClicked)
}

// Add modal listeners for adding to-dos and adding checklists

const addModalListeners = (project) => {
  modalFunctions(
    ".add-todo-modal",
    ".add-todo",
    ".close-add-todo-modal",
    (modal, dataset) => addToDoHtml(modal, dataset, project),
  )

  modalFunctions(
    ".add-checklist-modal",
    ".add-checklist",
    ".close-add-checklist-modal",
    (modal, dataset) => addChecklistHtml(modal, dataset, project),
  )

  modalFunctions(
    ".view-todo-modal",
    ".to-do-text",
    ".close-view-todo-modal",
    (modal, dataset) => viewToDoHtml(modal, dataset, project),
  )

  modalFunctions(
    ".edit-todo-modal",
    ".edit-todo",
    ".close-edit-todo-modal",
    (modal, dataset) => editToDoHtml(modal, dataset, project),
  )

  modalFunctions(
    ".edit-checklist-modal",
    ".edit-checklist",
    ".close-edit-checklist-modal",
    (modal, dataset) => editChecklistHtml(modal, dataset, project),
  )

  modalFunctions(
    ".delete-todo-modal",
    ".delete-todo",
    ".close-delete-todo-modal",
    (modal, dataset) => deleteToDoHtml(modal, dataset, project),
  )

  modalFunctions(
    ".delete-checklist-modal",
    ".delete-checklist",
    ".close-delete-checklist-modal",
    (modal, dataset) => deleteChecklistHtml(modal, dataset, project),
  )
}

export default addModalListeners

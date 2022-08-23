import modalFunctions from "./modal.js"

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
  console.log("Hello delete modal is open mwamwa")
  const modalContent = modal.getElementsByClassName("modal-text")[0]
  //   const toDo = project.readProject()[dataset.todoid]
  //   project.deleteToDo(toDo)

  //   modalContent.textContent = `I mishu briney Dataset: ${dataset.todoid}`
}

export default addModalListeners

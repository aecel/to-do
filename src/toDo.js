import { getChecklistHTML } from "./checklist.js"

// --- Event listener for to-do-circles

const toDoCircleListener = (project) => {
  const toDoCircles = document.getElementsByClassName("to-do-circle")
  for (const circle of toDoCircles) {
    circle.addEventListener("click", () => {
      toDoCircleClicked(circle, project)
    })
  }
}

const toDoCircleClicked = (circle, project) => {
  const toDoId = circle.dataset.todoid
  const toDo = project.getToDoById(toDoId)
  // [toDoId]
  // const toToggle = toDo.gettoDo().readtoDo()[circleIndex]
  toDo.toggleChecked()

  circle.classList.toggle("checked-circle")
  if (circle.textContent == "") {
    circle.textContent = "✓"
  } else {
    circle.textContent = ""
  }
  circle.nextElementSibling.classList.toggle("italic-text")
}

// Get HTML pattern of the todos of a project

const getToDoHTML = (project) => {
  let returnHtml = ""

  const toDos = project.readProject()
  for (const toDo of toDos) {
    const toDoId = toDo.getId()
    let checkMark = ""
    let checkClass = ""
    let italic = ""
    let addChecklist = ""

    if (toDo.getChecked()) {
      checkMark = "✓"
      checkClass = "checked-circle"
      italic = "italic-text"
    }

    // if (toDo.getCheckList()) 
    if (true) {
      addChecklist =
        /* html */
        `
            <div data-todoid="${toDoId}" class="add-checklist">
              <img src="./images/plus-checklist.svg" class="add-checklist-icon" />
            </div>
            `
    }

    returnHtml +=
      /*html*/
      `
        <div data-todoid="${toDoId}" class="to-do-container">
          <div class="to-do-entry">
            <div data-todoid="${toDoId}" class="to-do-circle ${checkClass}">${checkMark}</div>
            <div data-todoid="${toDoId}" class="to-do-text ${italic}">${toDo.getTitle()}</div>
            ${addChecklist}
            <div data-todoid="${toDoId}" class="edit-todo">
              <img src="./images/pencil.svg" class="edit-todo-icon" />
            </div>
            <div data-todoid="${toDoId}" class="delete-todo">
              <img src="./images/remove.svg" class="delete-todo-icon" />
            </div>
          </div>
          ${getChecklistHTML(toDo)}
    
          
        </div>
          `
  }

  return returnHtml
}

export { toDoCircleListener, getToDoHTML }

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
  console.log("to-do id: ", toDoId)
  const toDo = project.readProject()[toDoId]
  // [toDoId]
  // const toToggle = toDo.gettoDo().readtoDo()[circleIndex]
  toDo.toggleChecked()
  console.log(toDo.getChecked())

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

    if (toDo.getCheckList()) {
      addChecklist =
        /* html */
        `
            <div class="add-checklist">
              <img src="./images/plus.svg" class="add-checklist-icon" />
            </div>
            `
    }

    returnHtml +=
      /*html*/
      `
        <div data-todoid="${toDoId}" class="to-do-container">
          <div class="to-do-entry">
            <div data-todoid="${toDoId}" class="to-do-circle ${checkClass}">${checkMark}</div>
            <div class="to-do-text ${italic}">${toDo.getTitle()}</div>
            <div data-todoid="${toDoId}" class="edit-todo">
              <img src="./images/pencil.svg" class="edit-todo-icon" />
            </div>
            <div data-todoid="${toDoId}" class="delete-todo">
              <img src="./images/remove.svg" class="delete-todo-icon" />
            </div>
          </div>
          ${getChecklistHTML(toDo)}
    
          ${addChecklist}
        </div>
          `
  }

  return returnHtml
}

export { toDoCircleListener, getToDoHTML }
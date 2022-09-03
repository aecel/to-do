import {
  formatDistance,
  subDays,
  parseISO,
  formatDistanceToNow,
} from "date-fns"
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
    let dueDate = ""

    if (toDo.getChecked()) {
      checkMark = "✓"
      checkClass = "checked-circle"
      italic = "italic-text"
    }

    if (toDo.getDueDate() != "") {
      const parsedDate = parseISO(toDo.getDueDate())
      const formattedDate = formatDistanceToNow(parsedDate)

      dueDate =
        /* html */
        `
      <div title="Due date" data-todoid="${toDoId}" class="to-do-icon to-do-due-date">
        <div class="to-do-icon">${formattedDate}</div>
      </div>
      `
    }

    // if (toDo.getCheckList())
    // if (true) {
    addChecklist =
      /* html */
      `
            <div title="Add a checklist item under this to-do" data-todoid="${toDoId}" class="to-do-icon add-checklist">
              <img src="./images/plus-checklist.svg" class="add-checklist-icon" />
            </div>
            `
    // }

    returnHtml +=
      /* html */
      `
        <div data-todoid="${toDoId}" class="to-do-container">
          <div data-todoid="${toDoId}" class="to-do-entry">
            <div data-todoid="${toDoId}" class="to-do-circle ${checkClass}">${checkMark}</div>
            <div data-todoid="${toDoId}" class="to-do-text ${italic}">${toDo.getTitle()}</div>
            
            <div title="${toDo.getPriority()} priority" data-todoid="${toDoId}" class="to-do-icon to-do-priority">
              <img class="priority-icon" src="./images/${toDo.getPriority()}.svg"/>
            </div>
            ${dueDate}
            ${addChecklist}
            <div title="Edit this to-do" data-todoid="${toDoId}" class="to-do-icon edit-todo">
              <img src="./images/pencil.svg" class="edit-todo-icon" />
            </div>
            <div title="Delete this to-do" data-todoid="${toDoId}" class="to-do-icon delete-todo">
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

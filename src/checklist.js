import newCheckList from "./newCheckList.js"
// --- Event listener for check-circles

const checkListListener = (project) => {
  const checkListCircles = document.getElementsByClassName("checklist-circle")
  for (const circle of checkListCircles) {
    circle.addEventListener("click", () => {
      checkCircleClicked(circle, project)
    })
  }
}

const checkCircleClicked = (circle, project) => {
  // const checkList = toDo.getCheckList().readCheckListEntries()
  const circleIndex = circle.dataset.checkid
  const toDoId = circle.dataset.todoid
  const toDo = project.getToDoById(toDoId)
  const toToggle = toDo.getCheckList().getChecklistById(circleIndex)
  toToggle.toggleChecked()

  circle.classList.toggle("checked-circle")
  if (circle.textContent == "") {
    circle.textContent = "✓"
  } else {
    circle.textContent = ""
  }
  circle.nextElementSibling.classList.toggle("italic-text")
}

// Get HTML pattern of the checklist of a todo

const getChecklistHTML = (toDo) => {
  let html = ""

  if (toDo.getCheckList() === false) {
    // return html
    const myChecklist = newCheckList()
    toDo.updateToDo({newCheckList: myChecklist})
  }

  // Check if checklist exists in the todo
  // (false is the default value for .getCheckList() because idk I'm dumb)
  const checkList = toDo.getCheckList().readCheckList()
  for (const entry of checkList) {
    const toDoId = toDo.getId()
    const checkId = entry.getId()

    let checkMark = ""
    let checkClass = ""
    let italic = ""

    if (entry.getChecked()) {
      checkMark = "✓"
      checkClass = "checked-circle"
      italic = "italic-text"
    }

    html +=
      /*html*/
      `
        <div data-checkid="${checkId}" class="checklist-entry">
          <div data-todoid="${toDoId}" data-checkid="${checkId}" class="checklist-circle ${checkClass}">${checkMark}</div>
          <div class="checklist-text ${italic}">${entry.getText()}</div>
          <div data-todoid="${toDoId}"  data-checkid="${checkId}" class="checklist-icon edit-checklist">
            <img src="./images/pencil.svg" class="edit-checklist-icon" />
          </div>
          <div data-todoid="${toDoId}"  data-checkid="${checkId}" class="checklist-icon delete-checklist">
            <img src="./images/remove.svg" class="delete-checklist-icon" />
          </div>
        </div>
      `
  }

  return html
}

export { checkListListener, getChecklistHTML }

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
  console.log("circle index: ", circleIndex, ",  to-do id: ", toDoId)
  const toDo = project.readProject()[toDoId]
  const toToggle = toDo.getCheckList().readCheckList()[circleIndex]
  toToggle.toggleChecked()
  console.log(toToggle.getChecked())

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
    return html
  }

  // Check if checklist exists in the todo
  // (false is the default value for .getCheckList() because idk I'm dumb)
  const checkList = toDo.getCheckList().readCheckListEntries()
  for (const entry of checkList) {
    const toDoId = toDo.getId()
    const checkId = checkList.indexOf(entry)

    let checkMark = ""
    let checkClass = ""
    let italic = ""

    if (entry[1]) {
      checkMark = "✓"
      checkClass = "checked-circle"
      italic = "italic-text"
    }

    html +=
      /*html*/
      `
          <div class="checklist-entry">
          <div data-todoid="${toDoId}" data-checkid="${checkId}" class="checklist-circle ${checkClass}">${checkMark}</div>
          <div class="checklist-text ${italic}">${entry[0]}</div>
          </div>
          `
  }

  return html
}

export { checkListListener, getChecklistHTML }

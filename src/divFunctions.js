// --- Div functions --- //

// Toggle class of given div
const toggleClassDiv = (div, classToToggle) => {
  div.classList.toggle(classToToggle)
}

// Toggle class with query selector
const toggleClassQuery = (querySelect, classToToggle) => {
  const div = document.querySelector(querySelect)
  div.classList.toggle(classToToggle)
}

// Toggle class with query selector all
const toggleClassQueryAll = (querySelect, classToToggle) => {
  const divs = document.querySelectorAll(querySelect)
  for (const div of divs) {
    div.classList.toggle(classToToggle)
  }
}

const hideDivQuery = (queryOfDiv) => {
  const div = document.querySelector(queryOfDiv)
  div.style.display = "none"
}

const hideDivQueryAll = (queryOfDiv) => {
  const divs = document.querySelectorAll(queryOfDiv)
  for (const div of divs) {
    div.style.display = "none"
  }
}

const hideDiv = (div) => {
  div.style.display = "none"
}

const showDiv = (div) => {
  div.style.display = "flex"
}

const showDivQuery = (queryOfDiv, disp) => {
  const div = document.querySelector(queryOfDiv)
  if (disp) {
    div.style.display = disp
  } else {
    div.style.display = "flex"
  }
}

const showDivQueryAll = (queryOfDiv, disp) => {
  const divs = document.querySelectorAll(queryOfDiv)

  if (disp) {
    for (const div of divs) {
      div.style.display = disp
    }
  } else {
    for (const div of divs) {
      div.style.display = "flex"
    }
  }
}

const changeTextContent = (queryOfDiv, textContent) => {
  const div = document.querySelector(queryOfDiv)
  div.textContent = textContent
}

const clearChildren = (parent) => {
  parent.innerHTML = ""
}

export {
  toggleClassDiv,
  toggleClassQuery,
  toggleClassQueryAll,
  hideDiv,
  hideDivQuery,
  hideDivQueryAll,
  showDiv,
  showDivQuery,
  showDivQueryAll,
  changeTextContent,
  clearChildren,
}

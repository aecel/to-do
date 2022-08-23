import {
  initializeProjectPage,
  previousButtonClicked,
  refreshProjectCards,
  setActiveProjectList,
} from "./projectCards.js"

import {
  toggleClassDiv,
  toggleClassQuery,
  toggleClassQueryAll,
  hideDiv,
  hideDivQuery,
  showDivQuery,
  showDivQueryAll,
  changeTextContent,
  clearChildren,
} from "./divFunctions.js"

// --- Event Listeners for Project Tabs ---

const projectTabListeners = (projectList) => {
  const projectTabList = document.getElementsByClassName("project-tab")
  for (const projectTab of projectTabList) {
    projectTab.addEventListener("click", () => {
      for (const projectTab of projectTabList) {
        projectTab.classList.remove("chosen-tab")
      }

      projectTab.classList.add("chosen-tab")

      if (projectTab.id == "docket-tab") {
        console.log("docket-tab")
        previousButtonClicked(projectList.readProjectList()[0])
      } else {
        const projectId = projectTab.dataset.index
        initializeProjectPage(projectList.readProjectList()[projectId])
      }
    })
  }
}

// Refresh project tabs

const refreshProjectTabs = (projectList) => {
  const projectTabs = document.querySelector(".sidebar")
  clearChildren(projectTabs)

  projectTabs.innerHTML =
    /*html*/
    `
    <div id="docket-tab" class="project-tab chosen-tab">
      <div class="circle-tab">
        <img class="docket-logo" src="./images/task-list.svg" />
      </div>
      Docket
    </div>
    `

  for (const project of projectList.readProjectList()) {
    appendProjectTab(project)
  }

  projectTabListeners(projectList)
}

const appendProjectTab = (project) => {
  const html =
    /*html*/
    `
    <div data-index="${project.getId()}" class="project-tab">
      <div class="circle-tab">
        <img class="docket-logo" src="./images/project.svg" />
      </div>
      ${project.getTitle()}
    </div>
    `
  const projectTabs = document.querySelector(".sidebar")
  projectTabs.innerHTML += html
}

export { refreshProjectTabs }

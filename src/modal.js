const cleanupHandler = (() => {
  const cleanupCallbacksPerModal = {}

  const cleanup = (modal) => {
    const cleanupCallbacks = cleanupCallbacksPerModal[modal]

    if (!cleanupCallbacks) return

    for (const callback of cleanupCallbacks) callback()

    cleanupCallbacksPerModal[modal] = []
  }

  const addCleanupCallback = (modal, callback) => {
    if (!cleanupCallbacksPerModal[modal]) cleanupCallbacksPerModal[modal] = []
    cleanupCallbacksPerModal[modal].push(callback)
  }

  return { cleanup, addCleanupCallback }
})()

const modalFunctions = (
  modalQuery,
  modalButtonQueryAll,
  closeButtonQuery,
  onOpen,
) => {
  cleanupHandler.cleanup(modalQuery)

  // Get the modal
  const modal = document.querySelector(modalQuery)

  // Get the button that opens the modal
  const modalButtons = document.querySelectorAll(modalButtonQueryAll)

  // Get the <span> element that closes the modal
  const closeButton = document.querySelector(closeButtonQuery)

  // When the user clicks the button, open the modal
  for (const modalButton of modalButtons) {
    const onClick = () => {
      console.log("OPEN")
      modal.style.display = "block"
      if (onOpen) {
        onOpen(modal, modalButton.dataset)
      }
    }

    modalButton.addEventListener("click", onClick)
    cleanupHandler.addCleanupCallback(modalQuery, () => modalButton.removeEventListener("click", onClick))
  }

  const closeForm = () => {
    console.log("CLOSE")
    modal.style.display = "none"
  }

  // When the user clicks on <closeButton> (x), close the modal
  closeButton.addEventListener("click", closeForm)

  cleanupHandler.addCleanupCallback(modalQuery, () => closeButton.removeEventListener("click", closeForm))
}

export default modalFunctions

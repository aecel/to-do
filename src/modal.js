const modalFunctions = (
  modalQuery,
  modalButtonQueryAll,
  closeButtonQuery,
  onOpen
) => {
  // Get the modal
  const modal = document.querySelector(modalQuery)

  // Get the button that opens the modal
  const modalButtons = document.querySelectorAll(modalButtonQueryAll)

  // Get the <span> element that closes the modal
  const closeButton = document.querySelector(closeButtonQuery)

  // When the user clicks the button, open the modal
  for (const modalButton of modalButtons) {
    modalButton.addEventListener("click", () => {
      modal.style.display = "block"
      if (onOpen) {
        onOpen(modal, modalButton.dataset)
      }
    })
  }

  // When the user clicks on <closeButton> (x), close the modal
  closeButton.addEventListener("click", () => {
    closeForm()
  })

  const closeForm = () => {
    modal.style.display = "none"
  }
}

export default modalFunctions

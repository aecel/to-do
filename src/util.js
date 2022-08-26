const removeAllEventListenersAndReturnClone = (element) => {
  const clone = element.cloneNode(true)
  element.parentNode.replaceChild(clone, element)
  return clone
}

export { removeAllEventListenersAndReturnClone }

const readArray = (array) => {
  return array.map((item) => {
    return item
  })
}

const deleteItem = (array, item) => {
  const index = array.indexOf(item)
  if (index != -1) {
    array.splice(index, 1)
  }
}

const returnExisting = (item) => {
  if (item) {
    return item
  }
}

export { readArray, deleteItem, returnExisting }

const deleteItem = (array, item) => {
  const index = array.indexOf(item)
  if (index != -1) {
    array.splice(index, 1)
  }
}

const returnExisting = (item, defaultItem) => {
  if (item !== null && item !== undefined) {
    return item
  } else if (defaultItem !== null && defaultItem !== undefined) {
    return defaultItem
  } else {
    return ""
  }
}

export { deleteItem, returnExisting }

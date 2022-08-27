const isEmpty = async value => {
  return value === '' || value === null || value === undefined || value === 'null' || value === 'undefined'
}

export {
  isEmpty
}

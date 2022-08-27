const isEmpty = async value => {
  return value === '' || value === null || value === undefined || value === 'null' || value === 'undefined'
}

const isValid = async value => {
  return value === '1' || value === '2' || value === '3' || value === '4'
}

export {
  isEmpty,
  isValid
}

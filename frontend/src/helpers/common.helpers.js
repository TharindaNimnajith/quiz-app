const isEmpty = async value => {
  return (
    value === '' ||
    value === null ||
    value === undefined ||
    value === 'null' ||
    value === 'undefined')
}

const isValidCorrectAnswer = async value => {
  return (
    value === '1' ||
    value === '2' ||
    value === '3' ||
    value === '4' ||
    value === '5')
}

const isValidLesson = async value => {
  return (
    value === '1' ||
    value === '2' ||
    value === '3' ||
    value === '4')
}

const isValidQuizLevel = async value => {
  return (
    value === 'General' ||
    value === '1A' ||
    value === '1B' ||
    value === '2A' ||
    value === '2B' ||
    value === '3A' ||
    value === '3B')
}

export {
  isEmpty,
  isValidCorrectAnswer,
  isValidLesson,
  isValidQuizLevel
}

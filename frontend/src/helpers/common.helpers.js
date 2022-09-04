// noinspection UnnecessaryLocalVariableJS

const isEmpty = async value => {
  const status =
    value === '' ||
    value === null ||
    value === undefined ||
    value === 'null' ||
    value === 'undefined'

  return status
}

const isValidCorrectAnswer = async value => {
  const status =
    value === '1' ||
    value === '2' ||
    value === '3' ||
    value === '4' ||
    value === '5'

  return status
}

const isValidLesson = async value => {
  const status =
    value === '1' ||
    value === '2' ||
    value === '3' ||
    value === '4'

  return status
}

const isValidQuizLevel = async value => {
  const status =
    value === 'General' ||
    value === '1A' ||
    value === '1B' ||
    value === '2A' ||
    value === '2B' ||
    value === '3A' ||
    value === '3B'

  return status
}

export {
  isEmpty,
  isValidCorrectAnswer,
  isValidLesson,
  isValidQuizLevel
}

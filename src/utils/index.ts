export const generateRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16)

  return '#' + randomColor
}
export const generateID = () => {
  const date = new Date()

  return Math.floor(date.getTime() * Math.random())
}
